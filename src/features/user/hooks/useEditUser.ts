import { useMutation } from '@tanstack/react-query';
import { editUser, type EditUserPayload } from '../api/editUser';
import toast from 'react-hot-toast';

export function useEditUser({
	usersRefetch,
	onSuccess,
}: {
	usersRefetch: () => void;
	onSuccess?: () => void;
}) {
	return useMutation({
		mutationFn: (payload: EditUserPayload) => editUser(payload),
		onSuccess: () => {
			usersRefetch();
			toast.success('Usuário editado com sucesso!');
			onSuccess?.();
		},
		onError: (error) => {
			toast.error((error as Error).message || 'Falha ao editar usuário');
		},
	});
}
