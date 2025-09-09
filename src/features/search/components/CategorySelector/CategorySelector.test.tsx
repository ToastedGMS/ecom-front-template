import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelector from './CategorySelector';
import { vi } from 'vitest';

const mockCategories = [
	{ id: 1, name: 'Eletrônicos', position: 1 },
	{ id: 2, name: 'Roupas', position: 2 },
];

describe('CategorySelector', () => {
	it('renders category options including default', () => {
		render(
			<CategorySelector
				categories={mockCategories}
				isSearching={false}
				onSearch={() => {}}
			/>
		);

		const select = screen.getByRole('combobox');
		expect(select).toBeInTheDocument();

		const options = screen.getAllByRole('option');
		expect(options).toHaveLength(3); // includes default option
		expect(options[0]).toHaveTextContent(/Selecione/i);
		expect(options[1]).toHaveTextContent('Eletrônicos');
		expect(options[2]).toHaveTextContent('Roupas');
	});

	it('disables button when isSearching is true', () => {
		render(
			<CategorySelector
				categories={mockCategories}
				isSearching={true}
				onSearch={() => {}}
			/>
		);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveTextContent('Pesquisando...');
	});

	it('calls onSearch with selected category ID', () => {
		const handleSearch = vi.fn();
		render(
			<CategorySelector
				categories={mockCategories}
				isSearching={false}
				onSearch={handleSearch}
			/>
		);

		const select = screen.getByRole('combobox');
		fireEvent.change(select, { target: { value: '2' } });

		expect(handleSearch).toHaveBeenCalledWith(2);
	});
});
