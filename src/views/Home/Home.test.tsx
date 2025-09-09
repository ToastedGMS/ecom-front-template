import { screen, render } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { ProductContext } from '../../features/product/context/ProductContext';

vi.mock('../../features/product/api/fetchProducts', () => ({
	fetchProducts: vi.fn(() =>
		Promise.resolve([
			{
				id: '1',
				name: 'Dog Toy',
				description: 'A durable chew toy.',
				price: 10.99,
				imageUrl: 'https://placehold.co/200x200?text=Dog+Toy',
				isHighlight: true,
				onSale: false,
			},
		])
	),
}));

const mockProductContext = {
	products: [],
	setProducts: vi.fn(),
	searchProducts: vi.fn(),
};

function TestWrapper({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<ProductContext.Provider value={mockProductContext}>
				<MemoryRouter>
					<HelmetProvider>{children}</HelmetProvider>
				</MemoryRouter>
			</ProductContext.Provider>
		</QueryClientProvider>
	);
}

describe('Home', () => {
	beforeEach(() => {
		render(
			<TestWrapper>
				<Home />
			</TestWrapper>
		);
	});

	it('renders the highlighted products carousel when data is available', async () => {
		expect(await screen.findByTestId('card-carrousel')).toBeInTheDocument();
	});
});
