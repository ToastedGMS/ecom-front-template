import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MiniCard from './MiniCard';

describe('MiniCard Component (Cart Mode)', () => {
	const mockCartItem = {
		id: '13',
		name: 'Premium Cat Food',
		description:
			'Nutritious dry food for adult cats. Rich in protein and vitamins.',
		price: 29.99,
		imageUrl: 'https://placehold.co/200x200?text=Cat+Food',
		quantity: 3,
	};

	beforeEach(() => {
		render(
			<MemoryRouter>
				<MiniCard product={mockCartItem} isCart />
			</MemoryRouter>
		);
	});

	it('renders a card containing the product image', () => {
		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', mockCartItem.imageUrl);
		expect(image).toHaveAttribute('alt', mockCartItem.name);
	});

	it('renders the product name', () => {
		const productCard = screen.getByTestId('product-card');
		const productName = screen.getByRole('heading', { level: 3 });
		expect(productCard).toContainElement(productName);
		expect(productName.textContent).toBe(mockCartItem.name);
	});

	it('renders the product price', () => {
		const productCard = screen.getByTestId('product-card');
		const price = screen.getByTestId('product-price');
		expect(productCard).toContainElement(price);
		expect(price.textContent).toBe('R$29.99');
	});

	it('renders buttons for adding and removing item quantity', () => {
		const productCard = screen.getByTestId('product-card');
		const addBtn = screen.getByTestId('add-btn');
		const rmvBtn = screen.getByTestId('rmv-btn');
		expect(productCard).toContainElement(addBtn);
		expect(productCard).toContainElement(rmvBtn);
	});

	it('displays the correct quantity', () => {
		const quantity = screen.getByTestId('quantity');
		expect(quantity).toBeInTheDocument();
		expect(quantity.textContent).toBe(String(mockCartItem.quantity));
	});
});
