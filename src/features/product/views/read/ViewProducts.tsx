import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../../category/api/fetchCategories';

import SearchTypeSelector from '../../../search/components/SearchTypeSelector/SearchTypeSelector';
import SearchControls from '../../../search/components/SearchControls/SearchControls';
import CategorySelector from '../../../search/components/CategorySelector/CategorySelector';
import ProductContainer from '../../components/ProductContainer/ProductContainer';

import { useProductSearch } from '../../hooks/useProductSearch';
import { useProductContext } from '../../context/ProductContext';
import toast from 'react-hot-toast';

export default function ViewProducts() {
	const [selectedOption, setSelectedOption] = useState<'nome' | 'categoria'>(
		'categoria'
	);
	const [searchVal, setSearchVal] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);

	const { products } = useProductContext();

	const {
		sortBy,
		sortOrder,
		setSortBy,
		setSortOrder,
		isSearching,
		handleSearch,
	} = useProductSearch();

	const categories = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	const triggerSearch = () => {
		if (selectedOption === 'nome') {
			if (!searchVal.trim()) {
				toast.error('Digite um termo de pesquisa');
				return;
			}
			handleSearch('nome', searchVal);
		} else {
			if (!selectedCategoryId) {
				toast.error('Selecione uma categoria válida');
				return;
			}
			handleSearch('categoria', selectedCategoryId);
		}
	};

	return (
		<div className="p-4 max-w-3xl mx-auto space-y-6">
			<SearchTypeSelector
				selected={selectedOption}
				onChange={setSelectedOption}
			/>

			{selectedOption === 'nome' ? (
				<SearchControls
					searchVal={searchVal}
					setSearchVal={setSearchVal}
					sortBy={sortBy}
					sortOrder={sortOrder}
					setSortBy={setSortBy}
					setSortOrder={setSortOrder}
					isSearching={isSearching}
					onSearch={triggerSearch}
				/>
			) : (
				<CategorySelector
					categories={categories.data || []}
					isSearching={isSearching}
					onSearch={(id) => {
						setSelectedCategoryId(id);
						handleSearch('categoria', id);
					}}
				/>
			)}

			<ProductContainer products={products} isAdmin={true} />
		</div>
	);
}
