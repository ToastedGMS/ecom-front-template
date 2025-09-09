import { useMutation } from '@tanstack/react-query';
import { editCategory, type editCategoryPayload } from '../api/editCategory';
import toast from 'react-hot-toast';

export function useEditCategory(
	categoriesRefetch: () => void,
	setEditId: (id: number | null) => void,
	setEditValue: (val: string) => void
) {
	return useMutation({
		mutationFn: (payload: editCategoryPayload) => editCategory(payload),
		onSuccess: () => {
			categoriesRefetch();
			setEditId(null);
			setEditValue('');
			toast.success('Categoria editada com sucesso!');
		},
		onError: (error) => {
			toast.error((error as Error).message || 'Falha ao editar categoria');
		},
	});
}
