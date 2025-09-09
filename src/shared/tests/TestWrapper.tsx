import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { SlugMapProvider } from '../../features/category/context/SlugMapContext';
import { AuthProvider } from '../../features/auth/context/AuthContext';
import { CartProvider } from '../../features/cart/context/CartContext';
import { ProductProvider } from '../../features/product/context/ProductContext';

const queryClient = new QueryClient();

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<SlugMapProvider>
			<AuthProvider>
				<CartProvider>
					<ProductProvider>
						<BrowserRouter>{children}</BrowserRouter>
					</ProductProvider>
				</CartProvider>
			</AuthProvider>
		</SlugMapProvider>
	</QueryClientProvider>
);
