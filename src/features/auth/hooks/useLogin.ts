import { useMutation } from '@tanstack/react-query';
import type { LoginPayload } from '../utils/auth';
import login from '../utils/auth';
import toast from 'react-hot-toast';

export function useLogin(onSuccess: (token: string) => void) {
	return useMutation({
		mutationFn: (payload: LoginPayload) => login(payload),
		onSuccess: (data) => {
			toast.success('Login successful!');
			onSuccess(data.data.access_token);
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});
}
