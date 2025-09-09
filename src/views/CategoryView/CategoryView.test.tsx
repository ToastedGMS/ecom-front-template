import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SlugMapContext } from '../../features/category/context/SlugMapContext';

// Mock fetchCategories
vi.mock('../../features/category/api/fetchCategories', () => ({
	fetchCategories: vi.fn(() =>
		Promise.resolve({
			id: 1,
			name: 'Playstation',
			products: [
				{ id: 101, name: 'PS5 Console', price: 499.99, imageUrl: 'ps5.jpg' },
				{
					id: 102,
					name: 'DualSense Controller',
					price: 69.99,
					imageUrl: 'controller.jpg',
				},
			],
		})
	),
}));

vi.mock('../../features/product/context/ProductContext', async () => {
	const actual = await vi.importActual(
		'../../features/product/context/ProductContext'
	);
	return {
		...actual,
		useProductContext: () => ({
			setProducts: vi.fn(),
			products: [],
			searchProducts: vi.fn(),
		}),
	};
});

import CategoryView from './CategoryView';
import { HelmetProvider } from 'react-helmet-async';

describe('CategoryView', () => {
	beforeEach(() => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<SlugMapContext.Provider value={{ playstation: 1 }}>
						<MemoryRouter initialEntries={['/categoria/playstation']}>
							<Routes>
								<Route
									path="/categoria/:categoria"
									element={<CategoryView />}
								/>
							</Routes>
						</MemoryRouter>
					</SlugMapContext.Provider>
				</HelmetProvider>
			</QueryClientProvider>
		);
	});

	it('renders the category title', async () => {
		const heading = await screen.findByRole('heading', { level: 2 });
		expect(heading).toHaveTextContent('Playstation');
	});

	it('renders product cards for the category', async () => {
		const cards = await screen.findAllByTestId('product-card');
		expect(cards).toHaveLength(2);
	});
});
