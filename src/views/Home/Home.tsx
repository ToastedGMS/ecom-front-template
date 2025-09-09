import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageCarrousel from '../../features/carrousel/components/ImageCarrousel/ImageCarrousel';
import CardCarousel from '../../features/carrousel/components/CardCarousel/CardCarousel';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../features/product/api/fetchProducts';
import type { Product } from '../../types/Product';
import { fetchCategories } from '../../features/category/api/fetchCategories';
import ReviewsCarousel from '../../features/carrousel/components/ReviewCarrousel/ReviewCarrousel';

interface CategoryWithProducts {
	id: number;
	name: string;
	products: Product[];
}

export default function Home(): JSX.Element {
	const { data: products } = useQuery({
		queryFn: fetchProducts,
		queryKey: ['products'],
	});

	const serviceCategory = useQuery<CategoryWithProducts>({
		queryFn: () => fetchCategories(7),
		queryKey: ['services'],
	});

	const highlightedProducts =
		products?.filter((product: Product) => product.isHighlight) ?? [];

	const onSaleProducts =
		products?.filter((product: Product) => product.onSale) ?? [];

	const services = serviceCategory.data;

	return (
		<>
			<Helmet>/* Meta Tags */</Helmet>

			<section className="w-full">
				<ImageCarrousel />
			</section>

			{highlightedProducts.length > 0 && (
				<section className="w-full py-16 bg-white text-center">
					<CardCarousel
						title="Produtos em destaque"
						products={highlightedProducts}
					/>
				</section>
			)}

			<section className="w-full py-16 bg-zinc-800 text-white text-center">
				<ReviewsCarousel />
			</section>

			{onSaleProducts.length > 0 && (
				<section className="w-full py-16 bg-white text-center">
					<CardCarousel
						title="Confira nossas promoções!"
						products={onSaleProducts}
					/>
				</section>
			)}

			{Array.isArray(services?.products) && services.products.length > 0 && (
				<section className="w-full py-16 bg-gray-50 text-center">
					<CardCarousel
						title="	Deixe seu console novinho em folha!"
						products={services.products}
					/>
				</section>
			)}
		</>
	);
}
