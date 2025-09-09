import { render, screen, fireEvent } from '@testing-library/react';
import ReviewsCarousel from './ReviewCarrousel';
import * as useIsMobileHook from '../../../../shared/hooks/useIsMobile';
import { reviews } from './data/reviews';
import { vi } from 'vitest';

// Mock useIsMobile
const useIsMobileMock = vi
	.spyOn(useIsMobileHook, 'useIsMobile')
	.mockReturnValue(false);

describe('ReviewsCarousel', () => {
	it('renders the carousel with title and source', () => {
		render(<ReviewsCarousel />);
		expect(screen.getByTestId('reviews-carousel')).toBeInTheDocument();
		expect(screen.getByText('O que nossos clientes dizem')).toBeInTheDocument();
		expect(screen.getByText('Fonte: Google Reviews')).toBeInTheDocument();
	});

	it('renders navigation buttons on desktop', () => {
		render(<ReviewsCarousel />);
		expect(screen.getByLabelText('Previous Page')).toBeInTheDocument();
		expect(screen.getByLabelText('Next Page')).toBeInTheDocument();
	});

	it('clicking next button shows the next review', () => {
		render(<ReviewsCarousel />);
		const nextButton = screen.getByLabelText('Next Page');
		fireEvent.click(nextButton);

		const secondReview = reviews[1];
		expect(
			screen.getByText((content) =>
				content.includes(secondReview.text.substring(0, 20))
			)
		).toBeInTheDocument();
		expect(screen.getByText(`- ${secondReview.name}`)).toBeInTheDocument();
	});

	it('clicking dots navigates to the corresponding review', () => {
		render(<ReviewsCarousel />);
		const dots = screen.getAllByRole('button', { hidden: true });

		if (dots.length > 1) {
			fireEvent.click(dots[1]);
			const secondReview = reviews[1];

			expect(
				screen.getByText((content) =>
					content.includes(secondReview.text.substring(0, 20))
				)
			).toBeInTheDocument();
			expect(screen.getByText(`- ${secondReview.name}`)).toBeInTheDocument();
		}
	});

	it('hides navigation buttons on mobile', () => {
		useIsMobileMock.mockReturnValue(true);
		render(<ReviewsCarousel />);
		expect(screen.queryByLabelText('Previous Page')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Next Page')).not.toBeInTheDocument();
	});
});
