import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../utils/categories/fetchCategories.ts', () => ({
	fetchCategories: vi.fn().mockResolvedValue([
		{ id: '1', name: 'action' },
		{ id: '2', name: 'adventure' },
	]),
}));

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: () => ({
			isSuccess: true,
			data: [
				{ id: '1', name: 'action' },
				{ id: '2', name: 'adventure' },
			],
		}),
	};
});

vi.mock('../../../features/product/context/ProductContext', async () => {
	const actual = await vi.importActual(
		'../../../features/product/context/ProductContext'
	);
	return {
		...actual,
		useProductContext: () => ({
			setProducts: vi.fn(),
		}),
	};
});

describe('Header Component', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('renders desktop layout when screen is wide', async () => {
		vi.doMock('../../hooks/useIsMobile.ts', () => ({
			useIsMobile: () => false,
		}));

		const { default: Header } = await import('./Header');

		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

		expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
		expect(screen.queryByTestId('icon-search')).not.toBeInTheDocument();
	});

	it('renders mobile layout when screen is narrow', async () => {
		vi.doMock('../../hooks/useIsMobile.ts', () => ({
			useIsMobile: () => true,
		}));

		const { default: Header } = await import('./Header');

		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

		// Search input should NOT be visible initially
		expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();

		// Search icon should be visible
		expect(screen.getByTestId('icon-search')).toBeInTheDocument();
	});

	it('renders category links from query', async () => {
		vi.doMock('../../hooks/useIsMobile.ts', () => ({
			useIsMobile: () => false,
		}));

		const { default: Header } = await import('./Header');

		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

		expect(screen.getByText('Action')).toBeInTheDocument();
		expect(screen.getByText('Adventure')).toBeInTheDocument();
	});
});
