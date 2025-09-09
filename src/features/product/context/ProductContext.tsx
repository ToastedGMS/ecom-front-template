import { createContext, useContext, useState } from 'react';
import type { Product } from '../../../types/Product';
import { fetchProducts } from '../api/fetchProducts';

export const ProductContext = createContext<any>(null);

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products, setProducts] = useState<Product[]>([]);

	const searchProducts = async () => {
		const results = await fetchProducts();
		setProducts(results);
	};

	return (
		<ProductContext.Provider value={{ products, setProducts, searchProducts }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => useContext(ProductContext);
