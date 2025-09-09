import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateCategory from './CreateCategory';
import { vi } from 'vitest';

// Mock mutation hook
const mutateMock = vi.fn();
vi.mock('../../hooks/useCreateCategory', () => ({
	useCreateCategory: () => ({
		isPending: false,
		isSuccess: false,
		mutate: mutateMock,
	}),
}));

const queryClient = new QueryClient();

describe('CreateCategory Component', () => {
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<CreateCategory />
				</MemoryRouter>
			</QueryClientProvider>
		);
		mutateMock.mockClear();
	});

	it('renders the heading', () => {
		const heading = screen.getByRole('heading', {
			level: 3,
			name: 'Adicionar nova categoria',
		});
		expect(heading).toBeInTheDocument();
	});

	it('renders the category creation form with empty input', () => {
		const form = screen.getByTestId('category-creation-form');
		expect(form).toBeInTheDocument();
		expect(form).toHaveFormValues({ name: '' });
	});

	it('updates input value when typing', () => {
		const input = screen.getByPlaceholderText(/digite o nome/i);
		fireEvent.change(input, { target: { value: 'RPG' } });
		expect(input).toHaveValue('RPG');
	});

	it('calls mutate with trimmed input on submit', () => {
		const input = screen.getByPlaceholderText(/digite o nome/i);
		fireEvent.change(input, { target: { value: '  RPG  ' } });

		const button = screen.getByRole('button', { name: /criar categoria/i });
		fireEvent.click(button);

		expect(mutateMock).toHaveBeenCalledWith({ name: 'RPG' });
	});

	it('does not call mutate if input is empty', () => {
		const form = screen.getByTestId('category-creation-form');
		fireEvent.submit(form);

		expect(mutateMock).not.toHaveBeenCalled();
	});
});
