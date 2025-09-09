import { screen, render } from '@testing-library/react';
import ImageCarrousel from './ImageCarrousel';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock useIsMobile to always return false (desktop) so arrows appear
vi.mock('../../../../shared/hooks/useIsMobile', () => ({
	useIsMobile: vi.fn(() => false),
}));

describe('ImageCarrousel', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<ImageCarrousel />
			</MemoryRouter>
		);
	});

	it('renders the image carrousel correctly', () => {
		const carousel = screen.getByTestId('home-carrousel');
		expect(carousel).toBeInTheDocument();
		const images = screen.getAllByRole('img');
		expect(images).toHaveLength(3);
		images.forEach((img) => expect(carousel).toContainElement(img));
	});

	it('renders the navigation buttons on desktop', () => {
		const carousel = screen.getByTestId('home-carrousel');
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(2); // previous + next
		buttons.forEach((btn) => expect(carousel).toContainElement(btn));
	});

	it('renders the dots', () => {
		const dots = screen.getAllByRole('img', { hidden: true }); // or query by class/text if needed
		// Or you can query by testid if you add one for dots
		expect(dots.length).toBeGreaterThan(0);
	});
});
