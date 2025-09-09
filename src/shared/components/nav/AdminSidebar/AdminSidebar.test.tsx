import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

describe('Admin Sidebar', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<AdminSidebar />
			</MemoryRouter>
		);
	});

	it('renders a nav sidebar', () => {
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		expect(nav).toContainElement(screen.getByAltText('logo'));
		expect(nav).toHaveTextContent('Categorias');
		expect(nav).toHaveTextContent('Produtos');
		expect(nav).toHaveTextContent('Usuários');
	});
});
