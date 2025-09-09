import { useState, type JSX } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from '../../../../shared/hooks/useIsMobile';
import ReviewCard from './ReviewCard/ReviewCard';
import { reviews } from './data/reviews';

export default function ReviewsCarousel(): JSX.Element {
	const [page, setPage] = useState(0);
	const isMobile = useIsMobile();
	const REVIEWS_PER_PAGE = 1;

	const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

	const handleChange = (newPage: number) => {
		if (newPage < 0) newPage = totalPages - 1;
		if (newPage >= totalPages) newPage = 0;
		setPage(newPage);
	};

	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			if (eventData.dir === 'Left') handleChange(page + 1);
			if (eventData.dir === 'Right') handleChange(page - 1);
		},
	});

	const start = page * REVIEWS_PER_PAGE;
	const currentReviews = reviews.slice(start, start + REVIEWS_PER_PAGE);

	return (
		<section
			className="my-12 max-w-6xl mx-auto px-4"
			data-testid="reviews-carousel"
			{...handlers}
		>
			<h2 className="text-2xl font-bold text-center mb-6">
				O que nossos clientes dizem
			</h2>

			<div className="flex items-center gap-4 w-full justify-center">
				{!isMobile && totalPages > 1 && (
					<button
						className="text-3xl md:text-5xl"
						aria-label="Previous Page"
						onClick={() => handleChange(page - 1)}
					>
						<HiChevronLeft />
					</button>
				)}

				<div className="w-full flex justify-center">
					{currentReviews.map((review, idx) => (
						<div key={idx} className="w-full">
							<ReviewCard review={review} />
						</div>
					))}
				</div>

				{!isMobile && totalPages > 1 && (
					<button
						className="text-3xl md:text-5xl"
						aria-label="Next Page"
						onClick={() => handleChange(page + 1)}
					>
						<HiChevronRight />
					</button>
				)}
			</div>

			<div className="flex gap-2 mt-4 justify-center">
				{Array.from({ length: totalPages }).map((_, i) =>
					i === page ? (
						<GoDotFill key={i} className="text-xl text-white" />
					) : (
						<GoDot
							key={i}
							className="text-xl text-gray-400 cursor-pointer"
							onClick={() => handleChange(i)}
						/>
					)
				)}
			</div>

			<p className="text-center text-sm text-gray-500 mt-2">
				Fonte: Google Reviews
			</p>
		</section>
	);
}
