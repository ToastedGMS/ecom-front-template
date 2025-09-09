export type editCategoryPayload = {
	id: number;
	name?: string;
	position?: number;
};
export async function editCategory(payload: editCategoryPayload) {
	const body: Record<string, any> = {};

	if (typeof payload.name === 'string') body.name = payload.name;
	if (typeof payload.position === 'number') body.position = payload.position;

	if (Object.keys(body).length === 0) {
		throw new Error('No update data provided');
	}

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/categories/${payload.id}/`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			},
			body: JSON.stringify(body),
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to edit category');
	}

	return res.json();
}
