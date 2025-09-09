import type React from 'react';

interface Props {
	selected: 'nome' | 'categoria';
	onChange: (value: 'nome' | 'categoria') => void;
}

export default function SearchTypeSelector({ selected, onChange }: Props) {
	return (
		<div className="flex flex-col md:flex-row md:items-center md:gap-4">
			<label htmlFor="type" className="font-medium text-gray-700">
				Pesquisa por:
			</label>
			<select
				name="type"
				id="type"
				value={selected}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					onChange(e.target.value as 'nome' | 'categoria')
				}
				className="mt-1 md:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto"
			>
				<option value="categoria">Categoria</option>
				<option value="nome">Nome</option>
			</select>
		</div>
	);
}
