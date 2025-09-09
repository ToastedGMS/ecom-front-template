import { screen, render, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewProducts from './ViewProducts';
import { vi } from 'vitest';

// Mock category fetch
vi.mock('../../../category/api/fetchCategories', () => ({
	fetchCategories: vi.fn(() =>
		Promise.resolve([
			{ id: 1, name: 'Ação' },
			{ id: 2, name: 'Aventura' },
		])
	),
}));

const createTestClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

vi.mock('../../context/ProductContext', async () => {
	const actual = await vi.importActual('../../context/ProductContext');
	return {
		...actual,
		useProductContext: () => ({
			products: [
				{
					id: '1',
					name: 'Dog Shampoo',
					description: 'Gentle cleansing for furry friends',
					price: 19.99,
					imageUrl: 'https://placehold.co/200x200?text=Dog+Shampoo',
				},
				{
					id: '2',
					name: 'Cat Conditioner',
					description: 'Silky smooth fur for your feline',
					price: 14.99,
					imageUrl: 'https://placehold.co/200x200?text=Cat+Conditioner',
				},
			],
			setProducts: vi.fn(),
			searchProducts: vi.fn().mockResolvedValue(undefined),
		}),
	};
});

describe('ViewProducts', () => {
	beforeEach(() => {
		const queryClient = createTestClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<ViewProducts />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders search type selector with options', () => {
		const select = screen.getByLabelText(/Pesquisa por/i);
		expect(select).toBeInTheDocument();
		expect(
			within(select).getByRole('option', { name: 'Categoria' })
		).toBeInTheDocument();
		expect(
			within(select).getByRole('option', { name: 'Nome' })
		).toBeInTheDocument();
	});

	it('renders search input when "nome" is selected', () => {
		fireEvent.change(screen.getByLabelText(/Pesquisa por/i), {
			target: { value: 'nome' },
		});
		expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Pesquisar' })
		).toBeInTheDocument();
	});

	it('renders category selector when "categoria" is selected', async () => {
		fireEvent.change(screen.getByLabelText(/Pesquisa por/i), {
			target: { value: 'categoria' },
		});
		const categorySelect = await screen.findByTestId('category-select');
		expect(categorySelect).toBeInTheDocument();

		const options = within(categorySelect).getAllByRole('option');
		expect(options).toHaveLength(3);
		expect(options[1]).toHaveTextContent('Ação');
		expect(options[2]).toHaveTextContent('Aventura');
	});

	it('switches between "nome" and "categoria" correctly', async () => {
		const select = screen.getByLabelText(/Pesquisa por/i);

		fireEvent.change(select, { target: { value: 'nome' } });
		expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
		expect(screen.queryByTestId('category-select')).not.toBeInTheDocument();

		fireEvent.change(select, { target: { value: 'categoria' } });
		expect(await screen.findByTestId('category-select')).toBeInTheDocument();
		expect(
			screen.queryByPlaceholderText('Pesquisar...')
		).not.toBeInTheDocument();
	});
});
