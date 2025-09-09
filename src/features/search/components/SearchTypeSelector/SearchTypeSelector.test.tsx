import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchTypeSelector from './SearchTypeSelector';

describe('SearchTypeSelector', () => {
	it('renders with correct selected value', () => {
		render(<SearchTypeSelector selected="nome" onChange={() => {}} />);
		expect(screen.getByLabelText(/Pesquisa por/i)).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toHaveValue('nome');
	});

	it('calls onChange when selection changes', () => {
		const handleChange = vi.fn();
		render(<SearchTypeSelector selected="categoria" onChange={handleChange} />);
		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'nome' },
		});
		expect(handleChange).toHaveBeenCalledWith('nome');
	});
});
