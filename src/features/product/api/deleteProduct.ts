export async function deleteProduct(productId: number) {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/products/${productId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			},
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to delete product');
	}

	return res.json();
}
