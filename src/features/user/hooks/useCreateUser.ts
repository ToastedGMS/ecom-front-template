import { useMutation } from '@tanstack/react-query';
import { createUserRequest, type CreateUserPayload } from '../api/createUser';
import toast from 'react-hot-toast';

export function useCreateUser() {
	return useMutation({
		mutationFn: (payload: CreateUserPayload) => createUserRequest(payload),
		onSuccess: () => {
			toast.success('User created');
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});
}
