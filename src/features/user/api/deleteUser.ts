export async function deleteUser(userId: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
		},
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to delete user');
	}

	return res.json();
}
