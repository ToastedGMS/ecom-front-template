import { useEffect, useState, useRef, type JSX } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useSwipeable } from 'react-swipeable';
import ProductCard from '../../../product/components/ProductCard/ProductCard';
import type { Product } from '../../../../types/Product';
import { useIsMobile } from '../../../../shared/hooks/useIsMobile';

interface CardCarouselProps {
	title?: string;
	products: Product[];
}

export default function CardCarousel({
	title,
	products,
}: CardCarouselProps): JSX.Element | null {
	const [index, setIndex] = useState(0);
	const isMobile = useIsMobile();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startAutoSlide = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		if (products.length <= 1) return;

		intervalRef.current = setInterval(() => {
			setIndex((prev) => (prev + 1) % products.length);
		}, 5000);
	};

	useEffect(() => {
		startAutoSlide();
		return () => clearInterval(intervalRef.current!);
	}, [products.length]);

	const handleChange = (newIndex: number) => {
		setIndex(newIndex);
		startAutoSlide();
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => handleChange((index + 1) % products.length),
		onSwipedRight: () =>
			handleChange((index - 1 + products.length) % products.length),
	});

	if (products.length === 0) return null;

	const currentProduct = products[index];
	const previousProduct =
		products[(index - 1 + products.length) % products.length];
	const nextProduct = products[(index + 1) % products.length];

	return (
		<div
			data-testid="card-carrousel"
			className="flex flex-col items-center my-6 w-full max-w-6xl mx-auto px-4"
			{...handlers}
		>
			{title && (
				<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center pb-2">
					{title}
				</h2>
			)}

			<div className="flex items-center gap-4 w-full justify-center">
				{products.length > 1 && !isMobile && (
					<button
						data-testid="nav-btn"
						className="text-4xl md:text-5xl"
						aria-label="Previous Card"
						onClick={() =>
							handleChange((index - 1 + products.length) % products.length)
						}
					>
						<HiChevronLeft />
					</button>
				)}

				{products.length > 2 && (
					<div className="hidden md:block w-1/3">
						<ProductCard product={previousProduct} variant="small" />
					</div>
				)}

				<div className={products.length > 2 ? 'w-full md:w-1/3' : 'w-full'}>
					<ProductCard product={currentProduct} />
				</div>

				{products.length > 2 && (
					<div className="hidden md:block w-1/3">
						<ProductCard product={nextProduct} variant="small" />
					</div>
				)}

				{products.length > 1 && !isMobile && (
					<button
						data-testid="nav-btn"
						aria-label="Next Card"
						className="text-4xl md:text-5xl"
						onClick={() => handleChange((index + 1) % products.length)}
					>
						<HiChevronRight />
					</button>
				)}
			</div>

			<div className="flex gap-2 mt-4">
				{products.map((_, i) =>
					i === index ? (
						<GoDotFill key={i} className="text-xl text-gray-800" />
					) : (
						<GoDot
							key={i}
							className="text-xl text-gray-400 cursor-pointer"
							onClick={() => handleChange(i)}
						/>
					)
				)}
			</div>
		</div>
	);
}
