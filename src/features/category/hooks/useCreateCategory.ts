import { useMutation } from '@tanstack/react-query';
import {
	createCategory,
	type CreateCategoryPayload,
} from '../api/postCategories';
import toast from 'react-hot-toast';

export function useCreateCategory() {
	return useMutation({
		mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
		onSuccess: () => {
			toast.success('Category created');
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});
}
