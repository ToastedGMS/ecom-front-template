import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../hooks/useCreateUser';

const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

export default function CreateUser() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const createUserMutation = useCreateUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createUserMutation.mutate({
			username: username.trim(),
			password: password.trim(),
		});
	};

	return (
		<div className="max-w-2xl mx-auto m-16 px-6 sm:px-8 lg:px-12">
			<div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
				<h3 className="text-2xl font-semibold text-gray-900 mb-6">
					Criar novo usuário
				</h3>

				<form
					onSubmit={handleSubmit}
					data-testid="user-creation-form"
					className="space-y-6"
				>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nome de usuário
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="Digite o nome de usuário..."
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Senha
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="Digite a senha..."
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
					>
						{createUserMutation.isPending ? 'Criando...' : 'Criar Usuário'}
					</button>
				</form>

				{createUserMutation.isSuccess && (
					<div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
						<p className="text-green-700 font-medium">
							Usuário criado com sucesso!
						</p>
						<button
							onClick={() => navigate(`${adminPath}/user`)}
							className="mt-2 text-sm text-blue-600 hover:underline"
						>
							Ver todos
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
