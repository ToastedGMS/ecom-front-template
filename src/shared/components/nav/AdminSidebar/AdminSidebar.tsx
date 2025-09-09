import { useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

export default function AdminSidebar() {
	const navigate = useNavigate();
	return (
		<div className="w-full md:w-1/5 bg-zinc-700 text-white flex flex-col items-center p-6">
			<nav className="w-full flex flex-col items-center">
				<img
					src="/logo.webp"
					alt="Paulada games logo"
					className="w-40 mb-6 cursor-pointer"
					onClick={() => navigate(`/`)}
				/>
				<ul className="flex flex-col gap-4 text-base w-full">
					<Dropdown
						title="Categorias"
						options={['Criar Categoria', 'Ver Categorias']}
						routes={[`/category/create`, `/category`]}
					/>
					<Dropdown
						title="Produtos"
						options={['Criar Produto', 'Ver Produtos']}
						routes={[`/product/create`, `/product`]}
					/>
					<Dropdown
						title="Usuários"
						options={['Criar Usuário', 'Ver Usuários']}
						routes={[`/user/create`, `/user`]}
					/>
					<div
						onClick={() => navigate(`${adminPath}`)}
						className="cursor-pointer font-bold text-2xl"
					>
						Dashboard
					</div>
					<div
						onClick={() => navigate(`/`)}
						className="cursor-pointer font-bold text-2xl"
					>
						Site Principal
					</div>
				</ul>
			</nav>
		</div>
	);
}
