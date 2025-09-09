import { MemoryRouter } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import { render, screen } from '@testing-library/react';

describe('DashboardCard', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<DashboardCard title="test" value={9} routes={['/create', '/view']} />
			</MemoryRouter>
		);
	});

	it('renders a card with the correct title', () => {
		expect(screen.getByText('test')).toBeInTheDocument();
	});

	it('renders the main icon (HiServer)', () => {
		expect(
			screen.getByTestId('dashboard-card').querySelector('svg')
		).toBeInTheDocument();
	});

	it('displays the number 9', () => {
		expect(screen.getByText('9')).toBeInTheDocument();
	});

	it('displays the subtitle "no total"', () => {
		expect(screen.getByText('no total')).toBeInTheDocument();
	});

	it('renders all action icons', () => {
		const icons = screen.getByTestId('dashboard-card').querySelectorAll('svg');
		expect(icons.length).toBe(3);
	});

	it('has the correct data-testid', () => {
		expect(screen.getByTestId('dashboard-card')).toBeInTheDocument();
	});
});
