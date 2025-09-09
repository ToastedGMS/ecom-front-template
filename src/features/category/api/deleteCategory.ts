export async function deleteCategory(categoryId: number) {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			},
		}
	);
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to delete category');
	}

	return res.json();
}
