import { GoStarFill } from 'react-icons/go';
import type { JSX } from 'react';

interface Review {
	name: string;
	rating: number; // 1–5
	text: string;
}

export default function ReviewCard({
	review,
}: {
	review: Review;
}): JSX.Element {
	return (
		<div className="p-4 border rounded-lg shadow-sm bg-white w-full">
			<div className="flex items-center mb-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<GoStarFill
						key={i}
						data-testid={i < review.rating ? 'star-filled' : 'star-empty'}
						className={`mr-1 ${
							i < review.rating ? 'text-yellow-400' : 'text-gray-300'
						}`}
					/>
				))}
			</div>
			<p className="text-gray-700 mb-2">"{review.text}"</p>
			<p className="text-sm font-semibold text-gray-800">- {review.name}</p>
		</div>
	);
}
