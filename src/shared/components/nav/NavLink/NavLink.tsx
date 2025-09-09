import { Link } from 'react-router-dom';
interface NavLinkProps {
	label: string;
	to: string;
}

export default function NavLink({ label, to }: NavLinkProps) {
	return (
		<li className="hover:cursor-pointer hover:text-black transition-colors duration-300">
			<Link to={to}>{label}</Link>
		</li>
	);
}
