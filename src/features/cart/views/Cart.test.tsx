import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';
import { HelmetProvider } from 'react-helmet-async';

describe('Cart Component', () => {
	beforeEach(() => {
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			</HelmetProvider>
		);
	});
	it('renders the Cart heading', () => {
		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toBeInTheDocument();
	});
	it('renders cart total', () => {
		const total = screen.getByTestId('total');
		expect(total).toBeInTheDocument();
		expect(total).not.toBeEmptyDOMElement();
	});
	it('renders a checkout button', () => {
		const checkoutButton = screen.getByTestId('checkout-btn');
		expect(checkoutButton).toBeInTheDocument();
	});
});
