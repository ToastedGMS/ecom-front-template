import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/fetchUsers';
import { HiCheck, HiPencil, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import type { User } from '../../../../types/User';
import { useEditUser } from '../../hooks/useEditUser';
import { useDeleteUser } from '../../hooks/useDeleteUser';

export default function ViewUsers() {
	const [editId, setEditId] = useState<number | null>(null);
	const [editValue, setEditValue] = useState('');
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const users = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	});

	const editMutation = useEditUser({
		usersRefetch: users.refetch,
		onSuccess: () => {
			setEditId(null);
			setEditValue('');
		},
	});

	const deleteMutation = useDeleteUser({
		usersRefetch: users.refetch,
		onSuccess: () => setSuccessMessage('Usuário excluído com sucesso!'),
		onError: () => setSuccessMessage(null),
	});

	const handleEdit = (userId: number) => {
		if (!editValue.trim()) return;
		setSuccessMessage(null);
		editMutation.mutate({ id: userId, username: editValue.trim() });
	};

	const handleDelete = (userId: number) => {
		if (
			confirm(
				'Você tem certeza que deseja excluir este usuário? Essa ação é irreversível.'
			)
		) {
			setSuccessMessage(null);
			setDeletingId(userId);
			deleteMutation.mutate(userId, {
				onSettled: () => setDeletingId(null),
			});
		}
	};

	return (
		<div className="flex-1 p-6 space-y-8">
			<div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
				<h3 className="text-xl font-semibold text-gray-800 px-4 py-4 border-b">
					Usuários
				</h3>
				{users.isSuccess && (
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm tracking-wider">
								<th className="px-4 py-3">ID</th>
								<th className="px-4 py-3">Nome de usuário</th>
								<th className="px-4 py-3">Ação</th>
							</tr>
						</thead>
						<tbody>
							{users.data.data.map((user: User) => (
								<tr
									key={user.id}
									className="border-b hover:bg-gray-50 transition-colors"
								>
									<td className="px-4 py-3 text-gray-700">{user.id}</td>
									<td className="px-4 py-3 text-gray-800 font-medium">
										{editId === user.id ? (
											<div className="flex items-center gap-2">
												<input
													type="text"
													defaultValue={user.username}
													onChange={(e) => setEditValue(e.target.value)}
													className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
													disabled={editMutation.isPending}
												/>
												<button
													onClick={() => handleEdit(user.id)}
													disabled={editMutation.isPending}
													className="text-green-600 hover:text-green-800 transition-colors"
												>
													<HiCheck size={18} />
												</button>
											</div>
										) : (
											user.username
										)}
									</td>
									<td className="px-4 py-3 flex gap-3 text-gray-600">
										<span
											data-testid="edit-icon"
											className="cursor-pointer hover:text-blue-500 transition-colors"
											onClick={() => {
												setEditId(user.id);
												setEditValue(user.username);
												setSuccessMessage(null);
											}}
										>
											<HiPencil size={18} />
										</span>
										<span
											data-testid="delete-icon"
											className={`transition-colors ${
												deletingId === user.id
													? 'text-gray-400 cursor-not-allowed'
													: 'cursor-pointer hover:text-red-500 text-gray-600'
											}`}
											onClick={() =>
												deletingId === user.id ? null : handleDelete(user.id)
											}
										>
											<HiTrash size={18} />
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{successMessage && (
				<div className="mt-4">
					<p className="text-green-600">{successMessage}</p>
				</div>
			)}
		</div>
	);
}
