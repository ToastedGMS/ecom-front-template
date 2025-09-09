import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

interface DropdownProps {
	title: string;
	options: string[];
	routes: string[];
}

export default function Dropdown({ title, options, routes }: DropdownProps) {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-fit">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer font-bold text-2xl"
			>
				{title}
			</div>

			<div
				className="overflow-hidden transition-all duration-500 ease-in-out"
				style={{
					maxHeight: isOpen ? '500px' : '0px',
					opacity: isOpen ? 1 : 0,
				}}
			>
				<ul className="flex flex-col gap-2 pt-2">
					{options.map((option, index) => (
						<li
							onClick={() => navigate(`${adminPath}${routes[index]}`)}
							key={index}
							className="font-normal text-base px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
						>
							{option}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
