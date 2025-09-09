import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return (
			<Navigate to={`/${import.meta.env.VITE_ADMIN_PATH}/login`} replace />
		);
	}
	return <Outlet />;
}
