import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../api/deleteUser';
import toast from 'react-hot-toast';

export function useDeleteUser({
	usersRefetch,
	onSuccess,
	onError,
}: {
	usersRefetch: () => void;
	onSuccess?: () => void;
	onError?: () => void;
}) {
	return useMutation({
		mutationFn: (userId: number) => deleteUser(userId),
		onSuccess: () => {
			usersRefetch();
			toast.success('Usuário excluído com sucesso!');
			onSuccess?.();
		},
		onError: (error) => {
			toast.error((error as Error).message || 'Falha ao excluir usuário');
			onError?.();
		},
	});
}
