import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/createProduct';
import toast from 'react-hot-toast';
export function useCreateProduct() {
	return useMutation({
		mutationFn: async (product: {
			name: string;
			description: string;
			price: string;
			categoryId: string;
			imageFile?: File;
			highlight?: boolean;
			onSale?: boolean;
			previousPrice?: string;
			isService?: boolean;
		}) => {
			return createProduct({
				name: product.name,
				description: product.description,
				price: product.price,
				category: product.categoryId,
				imageFile: product.imageFile,
				highlight: product.highlight,
				onSale: product.onSale,
				previousPrice: product.previousPrice,
				isService: product.isService,
			});
		},
		onSuccess: () => {
			toast.success(`Product created`);
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});
}
