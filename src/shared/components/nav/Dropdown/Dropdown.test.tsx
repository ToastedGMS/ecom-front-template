import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';
import { MemoryRouter } from 'react-router-dom';

describe('Dropdown', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<Dropdown
					title={'Test Title'}
					options={['Option 1', 'Option 2']}
					routes={['/option1', '/option2']}
				/>
			</MemoryRouter>
		);
	});
	it('renders a list containing the passed title prop', () => {
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});
	it('renders a list containing the passed options after click', () => {
		fireEvent.click(screen.getByText('Test Title'));
		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
	});
});
