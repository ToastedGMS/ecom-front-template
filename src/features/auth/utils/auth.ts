export type LoginPayload = {
	username: string;
	password: string;
};

export type LoginResponse = {
	message: string;
	data: {
		user: {
			id: number;
			username: string;
		};
		access_token: string;
	};
};

export default async function login(payload: LoginPayload) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Login failed');
	}

	return res.json();
}
