import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { searchByName } from '../../api/searchByName';
import MiniCard from '../../../../shared/components/card/MiniCard';
import type { Product } from '../../../../types/Product';
import { useProductContext } from '../../../product/context/ProductContext';

export default function SearchInput() {
	const [val, setVal] = useState('');
	const [debouncedVal, setDebouncedVal] = useState('');
	const { setProducts } = useProductContext();

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedVal(val);
		}, 500);
		return () => clearTimeout(handler);
	}, [val]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['search-results', debouncedVal],
		queryFn: () => searchByName(debouncedVal),
		enabled: !!debouncedVal,
	});

	useEffect(() => {
		if (data) {
			setProducts(data);
		}
	}, [data, setProducts]);

	const handleSelectProduct = () => {
		setVal('');
		setDebouncedVal('');
	};

	return (
		<div className="relative w-full mt-0">
			<input
				type="search"
				placeholder="Search..."
				value={val}
				onChange={(e) => setVal(e.target.value)}
				className="border border-gray-300 rounded-2xl px-4 py-1 w-full"
			/>

			{/* Floating results dropdown */}
			{debouncedVal && (
				<div className="absolute z-50 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-96 overflow-y-auto">
					{isLoading && <p className="p-4">Loading...</p>}
					{isError && (
						<p className="p-4 text-red-500">Error: {error.message}</p>
					)}
					{data?.length === 0 && <p className="p-4">No results found.</p>}
					{data?.length > 0 &&
						data.map((product: Product) => (
							<MiniCard
								key={product.id}
								product={product}
								onSelect={handleSelectProduct}
								isCart={false}
							/>
						))}
				</div>
			)}
		</div>
	);
}
