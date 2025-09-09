import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';

const adminPath = import.meta.env.VITE_ADMIN_PATH;

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login: useAuthLogin } = useAuth();
	const navigate = useNavigate();

	const loginMutation = useLogin((token) => {
		useAuthLogin(token);
		navigate(`/${adminPath}/`, { replace: true });
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loginMutation.mutate({
			username: username.trim(),
			password: password.trim(),
		});
	};

	return (
		<div className="flex items-center justify-center w-full min-h-screen bg-zinc-800 px-4">
			<div className="bg-zinc-700 text-white w-full max-w-md p-6 rounded-xl shadow-xl">
				<form
					data-testid="login-form"
					className="flex flex-col gap-6 items-center"
					onSubmit={handleSubmit}
				>
					<img
						src="/logo.webp"
						alt="Paulada games logo"
						className="w-40 sm:w-40"
					/>

					<div className="w-full">
						<label
							htmlFor="username"
							className="block text-lg font-semibold mb-2"
						>
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="w-full">
						<label
							htmlFor="password"
							className="block text-lg font-semibold mb-2"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={loginMutation.isPending}
						className="w-full bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg mt-4 transition-colors"
					>
						{loginMutation.isPending ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
}
