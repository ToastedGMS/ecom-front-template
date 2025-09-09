export type CreateCategoryPayload = {
	name: string;
};

export async function createCategory(payload: CreateCategoryPayload) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to create category');
	}

	return res.json();
}
