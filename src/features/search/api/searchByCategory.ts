export async function searchByCategory(
	id: number,
	sortBy?: 'name' | 'price' | 'dateAdded',
	sortOrder: 'asc' | 'desc' = 'asc'
) {
	if (!id) throw new Error('Category ID is required');

	const params = new URLSearchParams();
	if (sortBy) params.append('sortBy', sortBy);
	if (sortOrder) params.append('sortOrder', sortOrder);

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/categories/${id}?${params.toString()}`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to fetch category');
	}

	return res.json();
}
