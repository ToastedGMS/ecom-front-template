export type CreateUserPayload = {
	username: string;
	password: string;
};

export async function createUserRequest(payload: CreateUserPayload) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to create user');
	}

	return res.json();
}
