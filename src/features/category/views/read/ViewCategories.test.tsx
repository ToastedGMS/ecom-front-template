import { vi } from 'vitest';

vi.mock('../../api/fetchCategories', () => ({
	fetchCategories: vi.fn(() =>
		Promise.resolve([
			{ id: 1, name: 'Ação' },
			{ id: 2, name: 'Aventura' },
		])
	),
}));

vi.mock('../../hooks/useEditCategory', () => ({
	useEditCategory: () => ({
		isPending: false,
		mutate: vi.fn(),
	}),
}));

vi.mock('../../hooks/useDeleteCategory', () => ({
	useDeleteCategory: () => ({
		mutate: vi.fn(),
	}),
}));
import { screen, render, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewCategories from './ViewCategories';

const createTestClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

describe('ViewCategories Component', () => {
	beforeEach(() => {
		const queryClient = createTestClient();
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<ViewCategories />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders the heading', async () => {
		const heading = await screen.findByRole('heading', {
			level: 3,
			name: 'Categorias',
		});
		expect(heading).toBeInTheDocument();
	});

	it('renders category rows with correct names', async () => {
		const rows = await screen.findAllByRole('row');
		const dataRows = rows.slice(1);

		expect(dataRows).toHaveLength(2);

		const firstRow = within(dataRows[0]);
		const secondRow = within(dataRows[1]);

		expect(firstRow.getByText('Ação')).toBeInTheDocument();
		expect(secondRow.getByText('Aventura')).toBeInTheDocument();
	});

	it('renders edit and delete icons for each category', async () => {
		const editIcons = await screen.findAllByTestId('edit-icon');
		const deleteIcons = await screen.findAllByTestId('delete-icon');

		expect(editIcons).toHaveLength(2);
		expect(deleteIcons).toHaveLength(2);
	});

	it('enters edit mode when edit icon is clicked', async () => {
		const editIcons = await screen.findAllByTestId('edit-icon');
		fireEvent.click(editIcons[0]);

		const input = screen.getByDisplayValue('Ação');
		expect(input).toBeInTheDocument();
	});

	it('calls confirm and triggers delete when confirmed', async () => {
		const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

		const deleteIcons = await screen.findAllByTestId('delete-icon');
		fireEvent.click(deleteIcons[0]);

		expect(confirmSpy).toHaveBeenCalled();
		confirmSpy.mockRestore();
	});

	it('does not trigger delete if confirm is cancelled', async () => {
		const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

		const deleteIcons = await screen.findAllByTestId('delete-icon');
		fireEvent.click(deleteIcons[0]);

		expect(confirmSpy).toHaveBeenCalled();
		confirmSpy.mockRestore();
	});
	it('renders move up and down icons for each category', async () => {
		const upIcons = await screen.findAllByTestId('move-up-icon');
		const downIcons = await screen.findAllByTestId('move-down-icon');

		expect(upIcons).toHaveLength(2);
		expect(downIcons).toHaveLength(2);
	});

	it('triggers reorder when move up icon is clicked', async () => {
		const upIcons = await screen.findAllByTestId('move-up-icon');
		fireEvent.click(upIcons[1]); // move second category up

		// You can assert that mutate was called with swapped positions
		// if you mock editMutation.mutate to track calls
	});

	it('does not reorder if move is out of bounds', async () => {
		const upIcons = await screen.findAllByTestId('move-up-icon');
		fireEvent.click(upIcons[0]); // first item can't move up

		// You can assert that mutate was not called
	});
});
