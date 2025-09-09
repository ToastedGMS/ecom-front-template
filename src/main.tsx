import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

import Layout from './shared/components/Layout/Layout.tsx';
import Home from './views/Home/Home.tsx';
import Error from './views/Error/Error.tsx';
import Cart from './features/cart/views/Cart.tsx';
import CategoryView from './views/CategoryView/CategoryView.tsx';
import ProductDetail from './features/product/views/product/ProductDetail.tsx';

import Login from './features/auth/views/Login.tsx';
import Dashboard from './features/dashboard/views/Dashboard.tsx';
import CreateCategory from './features/category/views/create/CreateCategory.tsx';
import ViewCategories from './features/category/views/read/ViewCategories.tsx';
import CreateUser from './features/user/views/create/CreateUser.tsx';
import ViewUsers from './features/user/views/read/ViewUsers.tsx';
import ViewProducts from './features/product/views/read/ViewProducts.tsx';
import CreateProduct from './features/product/views/create/CreateProduct.tsx';

import { AuthProvider } from './features/auth/context/AuthContext.tsx';
import { CartProvider } from './features/cart/context/CartContext.tsx';
import { ProductProvider } from './features/product/context/ProductContext.tsx';
import { SlugMapProvider } from './features/category/context/SlugMapContext.tsx';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute/ProtectedRoute.tsx';
import { HelmetProvider } from 'react-helmet-async';

const adminPath = import.meta.env.VITE_ADMIN_PATH;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<HelmetProvider>
			<SlugMapProvider>
				<AuthProvider>
					<CartProvider>
						<ProductProvider>
							<BrowserRouter>
								<StrictMode>
									<Toaster position="top-right" />
									<Routes>
										{/* Public Routes */}
										<Route path="/" element={<Layout />}>
											<Route index element={<Home />} />
											<Route path="cart" element={<Cart />} />
											<Route path="*" element={<Error />} />
											<Route
												path="categoria/:categoria"
												element={<CategoryView />}
											/>
											<Route path="product/:id" element={<ProductDetail />} />
										</Route>

										{/* Admin Routes */}
										<Route path={`${adminPath}/login`} element={<Login />} />
										<Route path={adminPath} element={<ProtectedRoute />}>
											<Route element={<Layout isAdmin={true} />}>
												<Route index element={<Dashboard />} />
												<Route
													path="category/create"
													element={<CreateCategory />}
												/>
												<Route path="category" element={<ViewCategories />} />
												<Route path="user/create" element={<CreateUser />} />
												<Route path="user" element={<ViewUsers />} />
												<Route path="product" element={<ViewProducts />} />
												<Route
													path="product/create"
													element={<CreateProduct />}
												/>
											</Route>
										</Route>
									</Routes>
								</StrictMode>
							</BrowserRouter>
						</ProductProvider>
					</CartProvider>
				</AuthProvider>
			</SlugMapProvider>
		</HelmetProvider>
	</QueryClientProvider>
);
