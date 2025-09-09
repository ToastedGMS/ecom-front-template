import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchControls from './SearchControls';

describe('SearchControls', () => {
	const props = {
		searchVal: '',
		setSearchVal: vi.fn(),
		sortBy: 'name',
		sortOrder: 'asc',
		setSortBy: vi.fn(),
		setSortOrder: vi.fn(),
		isSearching: false,
		onSearch: vi.fn(),
	};

	it('renders input and dropdowns', () => {
		render(<SearchControls {...props} />);
		expect(screen.getByPlaceholderText(/Pesquisar/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Ordenar por/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Ordem/i)).toBeInTheDocument();
	});

	it('disables button when isSearching is true', () => {
		render(<SearchControls {...props} isSearching={true} />);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveTextContent('Pesquisando...');
	});

	it('calls onSearch when button is clicked', () => {
		render(<SearchControls {...props} />);
		fireEvent.click(screen.getByRole('button'));
		expect(props.onSearch).toHaveBeenCalled();
	});
});
