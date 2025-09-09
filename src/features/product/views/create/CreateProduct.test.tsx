import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

vi.mock('../../../category/api/fetchCategories', () => ({
	fetchCategories: vi.fn(() =>
		Promise.resolve([
			{ id: 1, name: 'Ação' },
			{ id: 2, name: 'Aventura' },
		])
	),
}));

vi.mock('../../hooks/useCreateProduct', () => ({
	useCreateProduct: () => ({
		mutate: vi.fn(),
		isPending: false,
		isSuccess: false,
	}),
}));

describe('Create Product', () => {
	beforeEach(() => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<CreateProduct />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 3,
				name: 'Criar novo produto',
			})
		).toBeInTheDocument();
	});

	it('renders the product creation form', () => {
		expect(screen.getByTestId('product-creation-form')).toBeInTheDocument();
	});

	it('has empty initial form values', () => {
		expect(screen.getByLabelText('Nome do produto')).toHaveValue('');
		expect(screen.getByLabelText('Descrição')).toHaveValue('');
		expect(screen.getByLabelText('Preço')).toHaveValue(null);
		expect(screen.getByTestId('category-select')).toHaveValue('');
	});

	it('renders the image input', () => {
		expect(screen.getByLabelText('Imagem do produto')).toBeInTheDocument();
	});

	it('shows cropper UI when image is selected', async () => {
		const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
		const input = screen.getByLabelText('Imagem do produto');

		// Simulate image selection
		fireEvent.change(input, { target: { files: [file] } });

		// Wait for cropper to appear
		await waitFor(() =>
			expect(screen.getByText('Usar imagem')).toBeInTheDocument()
		);

		expect(screen.getByText('Cancelar')).toBeInTheDocument();
	});
	it('renders and toggles the highlight checkbox', () => {
		const checkbox = screen.getByLabelText(/destacar produto/i);

		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});
	it('renders and toggles the onSale checkbox and shows previousPrice input', () => {
		const checkbox = screen.getByLabelText(/produto em promoção/i);
		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();

		const previousPriceInput = screen.getByLabelText(/preço anterior/i);
		expect(previousPriceInput).toBeInTheDocument();

		fireEvent.change(previousPriceInput, { target: { value: '129.90' } });
		expect(previousPriceInput).toHaveValue(129.9);
	});
});
