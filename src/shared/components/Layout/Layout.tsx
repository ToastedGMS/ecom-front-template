import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import AdminSidebar from '../nav/AdminSidebar/AdminSidebar';
import { FaWhatsapp } from 'react-icons/fa';
import { HiMiniHome } from 'react-icons/hi2';
import { HiPhone } from 'react-icons/hi';

interface LayoutProps {
	isAdmin?: boolean;
}

export default function Layout({ isAdmin = false }: LayoutProps): JSX.Element {
	return (
		<div
			className={`min-h-screen ${
				isAdmin ? 'flex flex-col md:flex-row bg-gray-50' : 'flex flex-col'
			}`}
		>
			{isAdmin ? (
				<>
					<AdminSidebar />
					<Outlet />
				</>
			) : (
				<>
					<Header />
					<div className="flex-grow">
						<Outlet />
					</div>

					<a
						href="https://wa.me/5531986552199?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o+do+meu+console."
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Agendar avaliação via WhatsApp"
						className="text-5xl md:text-7xl fixed bottom-6 right-6 md:bottom-8 md:right-8 text-green-600 animate-bounce"
					>
						<FaWhatsapp />
					</a>

					<footer>
						<div className="w-full bg-zinc-800 text-white text-center py-6 space-y-3">
							<p className="text-sm">
								&copy; {new Date().getFullYear()} Paulada Games. All rights
								reserved.
							</p>

							<address className="not-italic space-y-1">
								<p className="flex items-start justify-center gap-2">
									<HiMiniHome className="text-xl leading-none shrink-0 mt-1" />
									R. Fiscal João Militão, 543 - Tropical, Contagem - MG,
									32070-570
								</p>

								<p className="flex items-center justify-center gap-2">
									<HiPhone className="text-xl shrink-0" />
									(31) 98655-2199
								</p>
							</address>
						</div>
					</footer>
				</>
			)}
		</div>
	);
}
