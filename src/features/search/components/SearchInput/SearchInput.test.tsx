import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchInput from './SearchInput';
import { searchByName } from '../../api/searchByName';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the API
vi.mock('../../api/searchByName', () => ({
	searchByName: vi.fn(),
}));

// Mock the ProductContext
vi.mock('../../../product/context/ProductContext', async () => {
	const actual = await vi.importActual(
		'../../../product/context/ProductContext'
	);
	return {
		...actual,
		useProductContext: () => ({
			setProducts: vi.fn(),
		}),
	};
});

describe('SearchInput Component', () => {
	const mockProducts = [
		{
			id: '1',
			name: 'Organic Dog Treats',
			price: 19.99,
			imageUrl: 'https://placehold.co/200x200?text=Dog+Treats',
		},
		{
			id: '2',
			name: 'Cat Scratching Post',
			price: 49.99,
			imageUrl: 'https://placehold.co/200x200?text=Scratching+Post',
		},
	];

	beforeEach(() => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<SearchInput />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders the input field', () => {
		const input = screen.getByPlaceholderText('Search...');
		expect(input).toBeInTheDocument();
	});

	it('shows loading state after typing', async () => {
		(searchByName as any).mockResolvedValueOnce(mockProducts);

		const input = screen.getByPlaceholderText('Search...');
		fireEvent.change(input, { target: { value: 'dog' } });

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});
	});

	it('shows "No results found" when API returns empty array', async () => {
		(searchByName as any).mockResolvedValueOnce([]);

		const input = screen.getByPlaceholderText('Search...');
		fireEvent.change(input, { target: { value: 'nothing' } });

		await waitFor(() => {
			expect(screen.getByText('No results found.')).toBeInTheDocument();
		});
	});

	it('renders MiniCard components when products are returned', async () => {
		(searchByName as any).mockResolvedValueOnce(mockProducts);

		const input = screen.getByPlaceholderText('Search...');
		fireEvent.change(input, { target: { value: 'cat' } });

		await waitFor(() => {
			const cards = screen.getAllByTestId('product-card');
			expect(cards).toHaveLength(mockProducts.length);
			expect(screen.getByText('Organic Dog Treats')).toBeInTheDocument();
			expect(screen.getByText('Cat Scratching Post')).toBeInTheDocument();
		});
	});
});
