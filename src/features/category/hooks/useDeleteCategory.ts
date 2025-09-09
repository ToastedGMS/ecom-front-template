import { useMutation } from '@tanstack/react-query';
import { deleteCategory } from '../api/deleteCategory';
import toast from 'react-hot-toast';

export function useDeleteCategory(categoriesRefetch: () => void) {
	return useMutation({
		mutationFn: (categoryId: number) => deleteCategory(categoryId),
		onSuccess: () => {
			categoriesRefetch();
			toast.success('Categoria excluída com sucesso!');
		},
		onError: (error) => {
			toast.error(error.message || 'Falha ao excluir categoria');
		},
	});
}
