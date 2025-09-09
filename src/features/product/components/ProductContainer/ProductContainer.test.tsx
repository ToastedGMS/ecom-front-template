import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductContainer from './ProductContainer';
import { vi } from 'vitest';

// ✅ Mock ProductContext used by ProductCard
vi.mock('../../context/ProductContext', async () => {
	const actual = await vi.importActual('../../context/ProductContext');
	return {
		...actual,
		useProductContext: () => ({
			setProducts: vi.fn(),
			products: [],
			searchProducts: vi.fn(),
		}),
	};
});

const mockProducts = [
	{
		id: '1',
		name: 'Chewy Bone Toy',
		description: 'Durable rubber bone toy for hours of chewing fun.',
		price: 12.99,
		isHighlight: false,
		imageUrl: 'https://placehold.co/200x200?text=Bone+Toy',
		onSale: false,
	},
	{
		id: '2',
		name: 'Premium Dog Food',
		description: 'Nutritious dry food for adult dogs, 2kg bag.',
		price: 24.99,
		isHighlight: false,
		onSale: false,
		imageUrl: 'https://placehold.co/200x200?text=Dog+Food',
	},
];

const renderWithProviders = (ui: React.ReactElement) => {
	const queryClient = new QueryClient();
	return render(
		<QueryClientProvider client={queryClient}>
			<MemoryRouter>{ui}</MemoryRouter>
		</QueryClientProvider>
	);
};

describe('ProductContainer', () => {
	it('renders label when isAdmin is true', () => {
		renderWithProviders(
			<ProductContainer
				products={mockProducts}
				label="Featured"
				isAdmin={true}
			/>
		);
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
			'Featured'
		);
	});

	it('does not render label when isAdmin is false', () => {
		renderWithProviders(
			<ProductContainer
				products={mockProducts}
				label="Hidden"
				isAdmin={false}
			/>
		);
		expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
	});

	it('renders correct number of ProductCards', () => {
		renderWithProviders(
			<ProductContainer products={mockProducts} isAdmin={false} />
		);
		expect(screen.getAllByTestId('product-card')).toHaveLength(
			mockProducts.length
		);
	});

	it('renders each product name and price', () => {
		renderWithProviders(
			<ProductContainer products={mockProducts} isAdmin={false} />
		);
		mockProducts.forEach((product) => {
			expect(screen.getByText(product.name)).toBeInTheDocument();
			expect(
				screen.getByText((text) => text.includes(product.price.toFixed(2)))
			).toBeInTheDocument();
		});
	});
});
