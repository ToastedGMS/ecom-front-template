import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateUser from './CreateUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Create User', () => {
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<CreateUser />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 3,
				name: 'Criar novo usuário',
			})
		).toBeInTheDocument();
	});

	it('renders the user creation form', () => {
		expect(screen.getByTestId('user-creation-form')).toBeInTheDocument();
	});

	it('has empty initial form values', () => {
		expect(screen.getByLabelText('Nome de usuário')).toHaveValue('');
		expect(screen.getByLabelText('Senha')).toHaveValue('');
	});
});
