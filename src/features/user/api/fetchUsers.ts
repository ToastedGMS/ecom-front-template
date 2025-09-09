export async function fetchUsers() {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to fetch users');
	}

	return res.json();
}
