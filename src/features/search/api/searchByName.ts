export async function searchByName(
	query: string,
	sortBy?: 'name' | 'price' | 'dateAdded',
	sortOrder: 'asc' | 'desc' = 'asc'
) {
	const params = new URLSearchParams({ query });

	if (sortBy) params.append('sortBy', sortBy);
	if (sortOrder) params.append('sortOrder', sortOrder);

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/products/search?${params.toString()}`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to search products');
	}

	return res.json();
}
