import { useMutation } from '@tanstack/react-query';
import { updateProduct } from '../api/editProduct';
export function useEditProduct() {
	return useMutation({
		mutationFn: updateProduct,
	});
}
