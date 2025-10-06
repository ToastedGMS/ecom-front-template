import { useContext, useState, type JSX } from 'react';
import { HiOutlineShoppingCart, HiSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import NavLink from '../nav/NavLink/NavLink.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../../features/category/api/fetchCategories.ts';
import type { Category } from '../../../types/Category.ts';
import { useIsMobile } from '../../hooks/useIsMobile.ts';
import { slugify } from '../../utils/slugify.ts';
import { CartContext } from '../../../features/cart/context/CartContext.tsx';
import SearchInput from '../../../features/search/components/SearchInput/SearchInput.tsx';

export default function Header(): JSX.Element {
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [enableSearch, setEnableSearch] = useState(false);
	const { cartItems } = useContext(CartContext);

	const categories = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	const toggleSearch = () => setEnableSearch((prev) => !prev);

	return (
		<header className="w-full px-8 pt-6 bg-[url(/header-background.webp)] bg-center">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				{isMobile ? (
					<>
						<div className="flex items-center justify-between px-2 w-full">
							<HiSearch
								data-testid="icon-search"
								onClick={toggleSearch}
								className="text-2xl text-white hover:text-black transition-colors duration-300 cursor-pointer"
							/>

							<img
								onClick={() => navigate('/')}
								src="/logo-icon.webp"
								alt="Logo"
								className="w-16 h-auto cursor-pointer"
							/>

							<div className="relative w-8 h-8 flex items-center justify-center">
								<HiOutlineShoppingCart
									data-testid="icon-cart"
									onClick={() => navigate('/cart')}
									className="text-2xl text-white hover:text-black transition-colors duration-300 cursor-pointer"
								/>
								{cartItems?.length > 0 && (
									<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
										{cartItems.length}
									</span>
								)}
							</div>
						</div>
					</>
				) : (
					<div className="grid grid-cols-4 items-center w-full gap-4">
						<div className="flex justify-start">
							<img
								onClick={() => navigate('/')}
								src="/logo.webp"
								alt="Logo"
								className="w-full max-w-[180px] md:max-w-[220px] lg:max-w-[250px] h-auto cursor-pointer"
							/>
						</div>

						<div className="flex justify-center col-span-2">
							<div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
								<SearchInput />
							</div>
						</div>

						<div className="relative w-8 h-8 flex items-center justify-center">
							<HiOutlineShoppingCart
								data-testid="icon-cart"
								onClick={() => navigate('/cart')}
								className="text-3xl text-white hover:text-black transition-colors duration-300 cursor-pointer"
							/>
							{cartItems?.length > 0 && (
								<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
									{cartItems.length}
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			{isMobile && enableSearch && (
				<div className="px-4 mt-2 transition-all duration-300 ease-in-out">
					<SearchInput />
				</div>
			)}

			<nav className="mt-4">
				<ul className="flex flex-wrap justify-between gap-2 sm:gap-4 text-base sm:text-lg font-bold text-white px-2 sm:px-12 py-2">
					{categories.isSuccess &&
						categories.data.map((category: Category) => (
							<NavLink
								key={category.id}
								label={
									category.name.charAt(0).toUpperCase() + category.name.slice(1)
								}
								to={`/categoria/${slugify(category.name)}`}
							/>
						))}
				</ul>
			</nav>
		</header>
	);
}
