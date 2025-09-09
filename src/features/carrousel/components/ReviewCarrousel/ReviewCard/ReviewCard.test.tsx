import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';

const review = {
	name: 'Test User',
	rating: 3,
	text: 'This is a test review.',
};

describe('ReviewCard', () => {
	it('renders the correct number of filled stars', () => {
		render(<ReviewCard review={review} />);
		const filledStars = screen.getAllByTestId('star-filled');
		expect(filledStars).toHaveLength(3);
	});

	it('renders the correct number of empty stars', () => {
		render(<ReviewCard review={review} />);
		const emptyStars = screen.getAllByTestId('star-empty');
		expect(emptyStars).toHaveLength(2); // 5 total - 3 filled
	});
});
