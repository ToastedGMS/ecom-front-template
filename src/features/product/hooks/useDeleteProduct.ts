import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../api/deleteProduct';

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (productId: number) => deleteProduct(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
}
