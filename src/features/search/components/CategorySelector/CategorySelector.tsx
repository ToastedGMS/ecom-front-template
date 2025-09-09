import type { Category } from '../../../../types/Category';

interface Props {
	categories: Category[] | undefined;
	isSearching: boolean;
	onSearch: (id: number) => void;
}

export default function CategorySelector({
	categories,
	isSearching,
	onSearch,
}: Props) {
	return (
		<div className="space-y-4">
			<select
				name="category"
				id="category"
				data-testid="category-select"
				className="border border-gray-300 rounded-lg px-3 py-2 w-full"
				onChange={(e) => onSearch(Number(e.target.value))}
			>
				<option value="">Selecione uma categoria</option>
				{categories?.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
			<button
				className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={isSearching}
			>
				{isSearching ? 'Pesquisando...' : 'Pesquisar'}
			</button>
		</div>
	);
}
