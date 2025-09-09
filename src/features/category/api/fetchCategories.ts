export async function fetchCategories(id?: number) {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/categories${id ? `/${id}` : ''}`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to fetch categories');
	}

	return res.json();
}
