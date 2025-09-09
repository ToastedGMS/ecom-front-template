export async function updateProduct({
	productId,
	updateData,
}: {
	productId: number;
	updateData: FormData;
}) {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/products/${productId}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			},
			body: updateData,
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to update product');
	}

	return res.json();
}
