import type { Product } from '../../../../types/Product';
import ProductCard from '../ProductCard/ProductCard';

interface ProductContainerProps {
	products: Product[];
	label?: string;
	isAdmin: boolean;
}

export default function ProductContainer({
	products,
	label,
	isAdmin,
}: ProductContainerProps) {
	return (
		<section className="p-6">
			{isAdmin && <h2 className="text-xl font-semibold mb-4">{label}</h2>}

			<ul
				className={`grid gap-4 justify-items-center ${
					isAdmin
						? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto-fit'
						: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
				}`}
			>
				{products.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} isAdmin={isAdmin} />
					</li>
				))}
			</ul>
		</section>
	);
}
