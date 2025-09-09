import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavLink from './NavLink';

describe('NavLink Component', () => {
	it('renders a list item with a link', () => {
		render(
			<MemoryRouter>
				<NavLink label="Test Link" to="/test" />
			</MemoryRouter>
		);

		const listItem = screen.getByRole('listitem');
		expect(listItem).toBeInTheDocument();

		const link = screen.getByRole('link', { name: 'Test Link' });
		expect(link).toHaveAttribute('href', '/test');
	});
});
