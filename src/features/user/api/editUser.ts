export type EditUserPayload = {
	id: number;
	username?: string;
	password?: string;
};

export async function editUser(payload: EditUserPayload) {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/users/${payload.id}/`,
		{
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			},
			body: JSON.stringify({
				username: payload.username,
				password: payload.password,
			}),
		}
	);

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to update user');
	}

	return res.json();
}
