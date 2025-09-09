import { screen, render, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { TestWrapper } from '../../../../shared/tests/TestWrapper';
import { vi } from 'vitest';

const mockProduct = {
	id: '1',
	name: 'Dog Shampoo',
	imageUrl: 'https://placehold.co/200x200?text=Dog+Shampoo',
	description: 'A gentle shampoo for dogs',
	isHighlight: false,
	price: 19.99,
	onSale: false,
};
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
					isHighlight: false,

					imageUrl: 'https://placehold.co/200x200?text=Dog+Shampoo',
				},
				{
					id: '2',
					name: 'Cat Conditioner',
					description: 'Silky smooth fur for your feline',
					price: 14.99,
					isHighlight: false,

					imageUrl: 'https://placehold.co/200x200?text=Cat+Conditioner',
				},
			],
			setProducts: vi.fn(),
			searchProducts: vi.fn().mockResolvedValue(undefined),
		}),
	};
});

describe('ProductCard Component', () => {
	it('renders product details in non-admin mode', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} isAdmin={false} />
			</TestWrapper>
		);

		expect(screen.getByRole('img')).toHaveAttribute('alt', mockProduct.name);
		expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
		expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
		expect(screen.getByText('R$19.99')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Adicionar ao Carrinho/i })
		).toBeInTheDocument();
	});

	it('renders admin controls when isAdmin is true', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} isAdmin />
			</TestWrapper>
		);

		expect(screen.getByTitle('Editar produto')).toBeInTheDocument();
		expect(screen.getByTitle('Excluir produto')).toBeInTheDocument();
	});

	it('enters edit mode when edit button is clicked', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} isAdmin />
			</TestWrapper>
		);

		fireEvent.click(screen.getByTitle('Editar produto'));

		expect(screen.getByPlaceholderText('Nome')).toHaveValue(mockProduct.name);
		expect(screen.getByPlaceholderText('Preço')).toHaveValue(
			mockProduct.price.toString()
		);
		expect(screen.getByPlaceholderText('Descrição')).toHaveValue(
			mockProduct.description
		);
	});
	it('cancels edit mode and resets fields when cancel button is clicked', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} isAdmin />
			</TestWrapper>
		);

		// Enter edit mode
		fireEvent.click(screen.getByTitle('Editar produto'));

		// Change some fields
		fireEvent.change(screen.getByPlaceholderText('Nome'), {
			target: { value: 'Changed Name' },
		});
		fireEvent.change(screen.getByPlaceholderText('Preço'), {
			target: { value: '99.99' },
		});
		fireEvent.change(screen.getByPlaceholderText('Descrição'), {
			target: { value: 'Changed description' },
		});

		fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));

		expect(screen.queryByPlaceholderText('Nome')).not.toBeInTheDocument();

		fireEvent.click(screen.getByTitle('Editar produto'));

		expect(screen.getByPlaceholderText('Nome')).toHaveValue(mockProduct.name);
		expect(screen.getByPlaceholderText('Preço')).toHaveValue(
			mockProduct.price.toString()
		);
		expect(screen.getByPlaceholderText('Descrição')).toHaveValue(
			mockProduct.description
		);
	});
	it('renders and toggles the onSale checkbox and previousPrice input', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} isAdmin />
			</TestWrapper>
		);

		fireEvent.click(screen.getByTitle('Editar produto'));

		const onSaleCheckbox = screen.getByLabelText(/produto em promoção/i);
		expect(onSaleCheckbox).not.toBeChecked();

		fireEvent.click(onSaleCheckbox);
		expect(onSaleCheckbox).toBeChecked();

		const previousPriceInput = screen.getByPlaceholderText(/preço anterior/i);
		expect(previousPriceInput).toBeInTheDocument();

		fireEvent.change(previousPriceInput, { target: { value: '29.99' } });
		expect(previousPriceInput).toHaveValue(29.99);
	});
});
