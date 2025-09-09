import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const mockProduct = {
	id: '23',
	name: 'Dog Shampoo',
	description: 'Gentle cleansing for furry friends',
	price: '19.99',
	imageUrl: 'https://placehold.co/200x200?text=Dog+Shampoo',
};

vi.mock('../../context/ProductContext', async () => {
	const actual = await vi.importActual('../../context/ProductContext');
	return {
		...actual,
		useProductContext: () => ({
			products: [mockProduct],
			setProducts: vi.fn(),
			searchProducts: vi.fn().mockResolvedValue(undefined),
		}),
	};
});

describe('Product Detail', () => {
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<MemoryRouter initialEntries={['/product/23']}>
						<Routes>
							<Route path="/product/:id" element={<ProductDetail />} />
						</Routes>
					</MemoryRouter>
				</HelmetProvider>
			</QueryClientProvider>
		);
	});

	it('renders the product name', () => {
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: mockProduct.name,
			})
		).toBeInTheDocument();
	});

	it('renders the product image', () => {
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', mockProduct.imageUrl);
		expect(image).toHaveAttribute('alt', mockProduct.name);
	});

	it('renders the product price and sale info', () => {
		expect(screen.getByText('R$19.99')).toBeInTheDocument();
	});
});
