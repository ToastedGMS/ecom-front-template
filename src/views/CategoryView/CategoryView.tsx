import { useQuery } from '@tanstack/react-query';
import ProductContainer from '../../features/product/components/ProductContainer/ProductContainer';
import { useParams } from 'react-router-dom';
import { fetchCategories } from '../../features/category/api/fetchCategories';
import { useSlugMap } from '../../features/category/context/SlugMapContext';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

export default function CategoryView() {
	const { categoria } = useParams();
	const slugMap = useSlugMap();
	const [readyToCheckSlug, setReadyToCheckSlug] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setReadyToCheckSlug(true), 300);
		return () => clearTimeout(timer);
	}, []);

	const categoryId = slugMap[categoria ?? ''];

	const { data, isLoading, isError } = useQuery({
		queryKey: ['category', categoryId],
		queryFn: () => fetchCategories(categoryId),
		enabled: !!categoryId,
	});

	if (!categoryId && !isLoading && readyToCheckSlug) {
		return (
			<>
				<Helmet>/* Meta Tags */</Helmet>
				<div className="max-w-4xl mx-auto p-6 text-center text-red-600 font-semibold">
					Categoria não encontrada.
				</div>
			</>
		);
	}

	if (!readyToCheckSlug || isLoading) {
		return (
			<>
				<Helmet>/* Meta Tags */</Helmet>
				<div className="max-w-4xl mx-auto p-6 text-center text-gray-500 animate-pulse">
					Carregando produtos...
				</div>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Helmet>/* Meta Tags */</Helmet>
				<div className="max-w-4xl mx-auto p-6 text-center text-red-500 font-medium">
					Erro ao carregar os produtos.
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>/* Meta Tags */</Helmet>
			<div className="max-w-6xl mx-auto px-4 py-8">
				<h2 className="text-3xl font-bold text-center text-zinc-800 mb-6">
					{data.name}
				</h2>
				{data.products.length > 0 ? (
					<ProductContainer
						products={data.products}
						label={`Categoria: ${data.name}`}
						isAdmin={false}
					/>
				) : (
					<p className="text-center text-gray-600 text-lg">
						Ainda não temos produtos por aqui, volte mais tarde!
					</p>
				)}
			</div>
		</>
	);
}
