import { vi } from 'vitest';
import { screen, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: vi.fn(({ queryKey }) => {
			switch (queryKey[0]) {
				case 'categories':
					return { isSuccess: true, data: [{ id: 1 }, { id: 2 }] };
				case 'products':
					return { isSuccess: true, data: [{ id: 1 }] };
				case 'users':
					return {
						isSuccess: true,
						data: { data: [{ id: 1 }, { id: 2 }, { id: 3 }] },
					};
				case 'activity':
					return { isSuccess: true, data: [] };
				default:
					return { isSuccess: false };
			}
		}),
	};
});

import Dashboard from './Dashboard';

// Mock query calls
vi.mock('../../../utils/categories/fetchCategories', () => ({
	fetchCategories: vi.fn(() => Promise.resolve([{ id: 1 }, { id: 2 }])),
}));

vi.mock('../../../utils/products/fetchProducts', () => ({
	fetchProducts: vi.fn(() => Promise.resolve([{ id: 1 }])),
}));

vi.mock('../../../utils/users/fetchUsers', () => ({
	fetchUsers: vi.fn(() =>
		Promise.resolve({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] })
	),
}));

vi.mock('../../../utils/activity/fetchActivity', () => ({
	fetchActivity: vi.fn(() => Promise.resolve([])),
}));

const createTestClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

describe('Dashboard', () => {
	beforeEach(() => {
		const queryClient = createTestClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<Dashboard />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders three dashboard cards', async () => {
		const cards = await screen.findAllByTestId('dashboard-card');
		expect(cards).toHaveLength(3);
	});

	it('renders dashboard cards with correct titles and values', async () => {
		const cards = await screen.findAllByTestId('dashboard-card');

		expect(within(cards[0]).getByText('Categorias')).toBeInTheDocument();
		expect(within(cards[0]).getByText('2')).toBeInTheDocument();

		expect(within(cards[1]).getByText('Produto')).toBeInTheDocument();
		expect(within(cards[1]).getByText('1')).toBeInTheDocument();

		expect(within(cards[2]).getByText('Usuários')).toBeInTheDocument();
		expect(within(cards[2]).getByText('3')).toBeInTheDocument();
	});
});
