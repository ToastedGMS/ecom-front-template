import { useQuery } from '@tanstack/react-query';
import DashboardCard from '../components/DashboardCard';
import { fetchCategories } from '../../category/api/fetchCategories';
import { fetchProducts } from '../../product/api/fetchProducts';
import { fetchUsers } from '../../user/api/fetchUsers';
import { fetchActivity } from '../api/fetchActivity';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Activity } from '../../../types/Activity';

export default function Dashboard() {
	const categories = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});
	const products = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
	const users = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
	const activity = useQuery({ queryKey: ['activity'], queryFn: fetchActivity });

	return (
		<div className="flex-1 p-6 space-y-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.isSuccess && (
					<DashboardCard
						title="Categorias"
						value={categories.data.length}
						routes={[`/category/create`, `/category`]}
					/>
				)}
				{products.isSuccess && (
					<DashboardCard
						title="Produtos"
						value={products.data.length}
						routes={[
							`/product/create`,
							`/product`,
							`/product/edit`,
							`/product/delete`,
						]}
					/>
				)}
				{users.isSuccess && (
					<DashboardCard
						title="Usuários"
						value={users.data.data.length}
						routes={[`/user/create`, `/user`, `/user/edit`, `/user/delete`]}
					/>
				)}
			</div>

			<div className="overflow-x-auto bg-white rounded-lg shadow-md">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm tracking-wider">
							<th className="px-4 py-3">Atividades Recentes</th>
							<th className="px-4 py-3">Data</th>
							<th className="px-4 py-3">Horário</th>
						</tr>
					</thead>
					<tbody>
						{activity.isSuccess &&
							activity.data.map((item: Activity, index: number) => (
								<tr
									key={index}
									className="border-b hover:bg-gray-50 transition-colors"
								>
									<td className="px-4 py-3 text-gray-800">
										<span className="font-medium">
											{item.user?.username ?? 'Usuário'}
										</span>{' '}
										{item.action}{' '}
										<span className="text-gray-600 italic">
											{item.metadata?.name}
										</span>
									</td>
									<td className="px-4 py-3 text-gray-700">
										{format(
											new Date(item.timestamp),
											"dd 'de' MMMM 'de' yyyy",
											{ locale: ptBR }
										)}
									</td>
									<td className="px-4 py-3 text-gray-700">
										{format(new Date(item.timestamp), 'HH:mm:ss', {
											locale: ptBR,
										})}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
