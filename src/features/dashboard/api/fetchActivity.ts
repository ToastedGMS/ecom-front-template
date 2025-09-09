export async function fetchActivity() {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/activity?limit=10`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to fetch activity');
	}

	return res.json();
}
