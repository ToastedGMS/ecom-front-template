import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { searchByName } from '../../search/api/searchByName';
import { searchByCategory } from '../../search/api/searchByCategory';
import { useProductContext } from '../context/ProductContext';
import toast from 'react-hot-toast';

export function useProductSearch() {
	const { setProducts } = useProductContext();
	const [sortBy, setSortBy] = useState<'name' | 'price' | 'dateAdded'>('name');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const searchByNameMutation = useMutation({
		mutationFn: ({
			query,
			sortBy,
			sortOrder,
		}: {
			query: string;
			sortBy: 'name' | 'price' | 'dateAdded';
			sortOrder: 'asc' | 'desc';
		}) => searchByName(query, sortBy, sortOrder),
		onSuccess: (data) => {
			setProducts(data); // update shared state
		},

		onError: (error: any) => {
			toast.error(error.message || 'Erro durante pesquisa');
		},
	});

	const searchByCategoryMutation = useMutation({
		mutationFn: ({
			id,
			sortBy,
			sortOrder,
		}: {
			id: number;
			sortBy: 'name' | 'price' | 'dateAdded';
			sortOrder: 'asc' | 'desc';
		}) => searchByCategory(id, sortBy, sortOrder),
		onSuccess: (data) => {
			setProducts(data.products); // update shared state
		},

		onError: (error: any) => {
			toast.error(error.message || 'Erro durante pesquisa por categoria');
		},
	});

	const isSearching =
		searchByNameMutation.isPending || searchByCategoryMutation.isPending;

	const handleSearch = (
		type: 'nome' | 'categoria',
		queryOrId: string | number
	) => {
		if (type === 'nome') {
			searchByNameMutation.mutate({
				query: queryOrId as string,
				sortBy,
				sortOrder,
			});
		} else {
			searchByCategoryMutation.mutate({
				id: queryOrId as number,
				sortBy,
				sortOrder,
			});
		}
	};

	return {
		sortBy,
		sortOrder,
		setSortBy,
		setSortOrder,
		isSearching,
		handleSearch,
	};
}
