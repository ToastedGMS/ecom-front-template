import { HiEye, HiPlus, HiServer } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

interface DashboardCardProps {
	title: string;
	value: number;
	routes: string[];
}

export default function DashboardCard({
	title,
	value,
	routes,
}: DashboardCardProps) {
	const navigate = useNavigate();
	return (
		<div
			data-testid="dashboard-card"
			className="flex flex-col text-center items-center rounded-2xl border-2 border-zinc-300 shadow-md p-8"
		>
			<HiServer />
			<p className="text-4xl my-4 font-extrabold">{value}</p>
			{value === 1 ? <p>{title.slice(0, -1)}</p> : <p>{title}</p>}
			<p>no total</p>
			<ul className="flex gap-4 mt-4">
				<li
					className="cursor-pointer"
					onClick={() => navigate(`${adminPath}${routes[0]}`)}
				>
					<HiPlus />
				</li>
				<li
					className="cursor-pointer"
					onClick={() => navigate(`${adminPath}${routes[1]}`)}
				>
					<HiEye />
				</li>
			</ul>
		</div>
	);
}
