interface Props {
	searchVal: string;
	setSearchVal: (val: string) => void;
	sortBy: string;
	sortOrder: string;
	setSortBy: (val: 'name' | 'price' | 'dateAdded') => void;
	setSortOrder: (val: 'asc' | 'desc') => void;
	isSearching: boolean;
	onSearch: () => void;
}

export default function SearchControls({
	searchVal,
	setSearchVal,
	sortBy,
	sortOrder,
	setSortBy,
	setSortOrder,
	isSearching,
	onSearch,
}: Props) {
	return (
		<div className="space-y-4">
			<input
				className="border border-gray-300 rounded-lg px-4 py-2 w-full"
				type="search"
				placeholder="Pesquisar..."
				value={searchVal}
				onChange={(e) => setSearchVal(e.target.value)}
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label
						htmlFor="sort"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Ordenar por:
					</label>
					<select
						name="sort"
						id="sort"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as any)}
						className="border border-gray-300 rounded-lg px-3 py-2 w-full"
					>
						<option value="name">Nome</option>
						<option value="price">Preço</option>
						<option value="dateAdded">Data Adicionado</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="order"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Ordem:
					</label>
					<select
						name="order"
						id="order"
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value as any)}
						className="border border-gray-300 rounded-lg px-3 py-2 w-full"
					>
						<option value="asc">Asc</option>
						<option value="desc">Desc</option>
					</select>
				</div>

				<div className="flex items-end">
					<button
						className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={onSearch}
						disabled={isSearching}
					>
						{isSearching ? 'Pesquisando...' : 'Pesquisar'}
					</button>
				</div>
			</div>
		</div>
	);
}
