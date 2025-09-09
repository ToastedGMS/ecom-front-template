import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api/fetchCategories';
import {
	HiArrowDown,
	HiArrowUp,
	HiCheck,
	HiPencil,
	HiTrash,
} from 'react-icons/hi';
import { useState } from 'react';
import type { Category } from '../../../../types/Category';
import { useEditCategory } from '../../hooks/useEditCategory';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';
import toast from 'react-hot-toast';

export default function ViewCategories() {
	const [editId, setEditId] = useState<number | null>(null);
	const [editValue, setEditValue] = useState('');
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const categories = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	const editMutation = useEditCategory(
		categories.refetch,
		setEditId,
		setEditValue
	);
	const handleEdit = (categoryId: number) => {
		if (!editValue.trim()) return;
		editMutation.mutate({ id: categoryId, name: editValue.trim() });
	};

	const deleteMutation = useDeleteCategory(categories.refetch);
	const handleDelete = (categoryId: number) => {
		if (
			confirm(
				'Você tem certeza que deseja excluir esta categoria? Essa ação é irreversível e apaga todos os produtos adjacentes à categoria deletada.'
			)
		) {
			setDeletingId(categoryId);
			deleteMutation.mutate(categoryId, {
				onSettled: () => setDeletingId(null),
			});
		}
	};
	const [moving, setMoving] = useState(false);

	const moveCategory = async (id: number, direction: 'up' | 'down') => {
		if (!categories.data) return;

		const index = categories.data.findIndex((c: Category) => c.id === id);
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= categories.data.length) return;

		const current = categories.data[index];
		const target = categories.data[targetIndex];

		setMoving(true); // disable buttons while moving
		try {
			await editMutation.mutateAsync({
				id: current.id,
				position: Number(target.position),
			});
			await editMutation.mutateAsync({
				id: target.id,
				position: Number(current.position),
			});
			categories.refetch();
		} catch (error) {
			toast.error('Falha ao mover a categoria');
		} finally {
			setMoving(false);
		}
	};

	return (
		<div className="flex-1 p-6 space-y-8">
			<div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
				<h3 className="text-xl font-semibold text-gray-800 px-4 py-4 border-b">
					Categorias
				</h3>
				{categories.isSuccess && (
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm tracking-wider">
								<th className="px-4 py-3">ID</th>
								<th className="px-4 py-3">Nome</th>
								<th className="px-4 py-3">Ação</th>
							</tr>
						</thead>
						<tbody>
							{categories.data.map((category: Category) => (
								<tr
									key={category.id}
									className="border-b hover:bg-gray-50 transition-colors"
								>
									<td className="px-4 py-3 text-gray-700">{category.id}</td>
									<td className="px-4 py-3 text-gray-800 font-medium">
										{editId === category.id ? (
											<div className="flex items-center gap-2">
												<input
													type="text"
													defaultValue={category.name}
													onChange={(e) => setEditValue(e.target.value)}
													className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
													disabled={editMutation.isPending}
												/>
												<button
													onClick={() => handleEdit(category.id)}
													disabled={editMutation.isPending}
													className="text-green-600 hover:text-green-800 transition-colors"
												>
													<HiCheck size={18} />
												</button>
											</div>
										) : (
											category.name
										)}
									</td>
									<td className="px-4 py-3 flex gap-3 text-gray-600">
										<span
											data-testid="edit-icon"
											className={`cursor-pointer hover:text-blue-500 transition-colors ${
												editMutation.isPending || moving
													? 'opacity-50 pointer-events-none'
													: ''
											}`}
											onClick={() => {
												if (!editMutation.isPending && !moving) {
													setEditId(category.id);
													setEditValue(category.name);
												}
											}}
										>
											<HiPencil size={18} />
										</span>
										<span
											data-testid="delete-icon"
											className={`transition-colors ${
												deletingId === category.id || moving
													? 'text-gray-400 cursor-not-allowed opacity-50 pointer-events-none'
													: 'cursor-pointer hover:text-red-500 text-gray-600'
											}`}
											onClick={() =>
												deletingId === category.id || moving
													? null
													: handleDelete(category.id)
											}
										>
											<HiTrash size={18} />
										</span>
										<span
											data-testid="move-up-icon"
											className={`cursor-pointer hover:text-gray-500 transition-colors ${
												moving ? 'opacity-50 pointer-events-none' : ''
											}`}
											onClick={() => !moving && moveCategory(category.id, 'up')}
										>
											<HiArrowUp />
										</span>
										<span
											data-testid="move-down-icon"
											className={`cursor-pointer hover:text-gray-500 transition-colors ${
												moving ? 'opacity-50 pointer-events-none' : ''
											}`}
											onClick={() =>
												!moving && moveCategory(category.id, 'down')
											}
										>
											<HiArrowDown />
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
