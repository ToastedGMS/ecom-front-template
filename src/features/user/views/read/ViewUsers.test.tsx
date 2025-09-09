import { screen, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewUsers from './ViewUsers';
import { vi } from 'vitest';

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual('@tanstack/react-query');
	return {
		...actual,
		useQuery: () => ({
			isSuccess: true,
			data: {
				data: [
					{ id: 101, username: 'alice' },
					{ id: 102, username: 'bob' },
				],
			},
			refetch: vi.fn(),
		}),
	};
});

vi.mock('../../../../utils/users/fetchUsers', () => ({
	fetchUsers: vi.fn(() =>
		Promise.resolve({
			data: [
				{ id: 101, username: 'alice' },
				{ id: 102, username: 'bob' },
			],
		})
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

describe('ViewUsers', () => {
	beforeEach(() => {
		const queryClient = createTestClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<ViewUsers />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 3,
				name: 'Usuários',
			})
		).toBeInTheDocument();
	});

	it('renders a table with correct usernames', async () => {
		const table = await screen.findByRole('table');
		const rows = within(table).getAllByRole('row');

		const dataRows = rows.slice(1);

		expect(dataRows).toHaveLength(2);

		const firstRow = within(dataRows[0]);
		const secondRow = within(dataRows[1]);

		expect(firstRow.getByText('alice')).toBeInTheDocument();
		expect(secondRow.getByText('bob')).toBeInTheDocument();
	});

	it('renders edit and delete icons for each user', async () => {
		const table = await screen.findByRole('table');
		const rows = within(table).getAllByRole('row');
		const dataRows = rows.slice(1); // skip header

		dataRows.forEach((row) => {
			const utils = within(row);
			expect(utils.getByTestId('edit-icon')).toBeInTheDocument();
			expect(utils.getByTestId('delete-icon')).toBeInTheDocument();
		});
	});
});
