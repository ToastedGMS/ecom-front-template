export async function fetchProducts() {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to fetch products');
	}

	return res.json();
}
