import { screen, render, fireEvent } from '@testing-library/react';
import Login from './Login';
import { TestWrapper } from '../../../shared/tests/TestWrapper';

describe('Login', () => {
	beforeEach(() => {
		render(
			<TestWrapper>
				<Login />
			</TestWrapper>
		);
	});
	it('renders a basic login form', () => {
		expect(screen.getByTestId('login-form')).toBeInTheDocument();
		expect(screen.getByTestId('login-form')).toHaveFormValues({
			username: '',
			password: '',
		});
		expect(screen.getByTestId('login-form')).toContainElement(
			screen.getByRole('button', { name: 'Login' })
		);
	});
	it('updates input fields on change', () => {
		const usernameInput = screen.getByLabelText(/username/i);
		const passwordInput = screen.getByLabelText(/password/i);

		fireEvent.change(usernameInput, { target: { value: 'testuser' } });
		fireEvent.change(passwordInput, { target: { value: 'secret' } });

		expect(usernameInput).toHaveValue('testuser');
		expect(passwordInput).toHaveValue('secret');
	});
});
