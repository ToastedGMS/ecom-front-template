import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategory } from '../../hooks/useCreateCategory';
const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

export default function CreateCategory() {
	const navigate = useNavigate();
	const [categoryName, setCategoryName] = useState('');

	const createCategoryMutation = useCreateCategory();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedName = categoryName.trim();
		if (!trimmedName) return;

		createCategoryMutation.mutate({
			name: trimmedName,
		});
	};

	return (
		<div className="max-w-2xl mx-auto m-16 px-6 sm:px-8 lg:px-12">
			<div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
				<h3 className="text-2xl font-semibold text-gray-900 mb-6">
					Adicionar nova categoria
				</h3>

				<form
					onSubmit={handleSubmit}
					data-testid="category-creation-form"
					className="space-y-6"
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nome da Categoria
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="Digite o nome..."
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
					>
						{createCategoryMutation.isPending
							? 'Criando...'
							: 'Criar Categoria'}
					</button>
				</form>

				{createCategoryMutation.isSuccess && (
					<div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
						<p className="text-green-700 font-medium">
							Categoria criada com sucesso!
						</p>
						<button
							onClick={() => navigate(`${adminPath}/category`)}
							className="mt-2 text-sm text-blue-600 hover:underline"
						>
							Ver todas
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
