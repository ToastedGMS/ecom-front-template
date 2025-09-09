import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardCarousel from './CardCarousel';
import type { Product } from '../../../../types/Product';
import { ProductContext } from '../../../product/context/ProductContext';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ Mock useIsMobile to force desktop for consistent testing
vi.mock('../../../../shared/hooks/useIsMobile', () => ({
	useIsMobile: vi.fn(() => false),
}));

const mockProductContext = {
	products: [],
	setProducts: vi.fn(),
	searchProducts: vi.fn(),
};

// Mock products
const highlightedProduct: Product = {
	id: '1',
	name: 'Dog Toy',
	description: 'A durable chew toy.',
	price: 10.99,
	imageUrl: 'https://placehold.co/200x200?text=Dog+Toy',
	isHighlight: true,
	onSale: false,
};

const multipleHighlighted: Product[] = [
	highlightedProduct,
	{
		id: '3',
		name: 'Dog Bed',
		description: 'Comfortable bed for dogs.',
		price: 49.99,
		imageUrl: 'https://placehold.co/200x200?text=Dog+Bed',
		isHighlight: true,
		onSale: false,
	},
];

function TestWrapper({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<ProductContext.Provider value={mockProductContext}>
				<MemoryRouter>{children}</MemoryRouter>
			</ProductContext.Provider>
		</QueryClientProvider>
	);
}

describe('CardCarousel', () => {
	it('renders nothing when no products are passed', () => {
		render(
			<TestWrapper>
				<CardCarousel products={[]} />
			</TestWrapper>
		);

		expect(screen.queryByTestId('card-carrousel')).not.toBeInTheDocument();
	});

	it('renders one product without navigation buttons', () => {
		render(
			<TestWrapper>
				<CardCarousel products={[highlightedProduct]} />
			</TestWrapper>
		);

		expect(screen.getByTestId('card-carrousel')).toBeInTheDocument();
		expect(screen.getAllByTestId('product-card')).toHaveLength(1);
		expect(screen.queryAllByTestId('nav-btn')).toHaveLength(0);
	});

	it('renders multiple products with navigation buttons', () => {
		render(
			<TestWrapper>
				<CardCarousel products={multipleHighlighted} />
			</TestWrapper>
		);

		expect(screen.getByTestId('card-carrousel')).toBeInTheDocument();
		expect(screen.getAllByTestId('product-card').length).toBeGreaterThanOrEqual(
			1
		);
		expect(screen.getAllByTestId('nav-btn')).toHaveLength(2); // previous + next
	});
});
