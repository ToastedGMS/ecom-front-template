import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { useContext } from 'react';
import { CartContext } from '../../../features/cart/context/CartContext';
import type { CartItem } from '../../../types/CartItem';
import { useNavigate } from 'react-router-dom';

interface MiniCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		imageUrl: string;
		quantity?: number;
		isService?: boolean;
	};
	isCart?: boolean;
	onSelect?: () => void;
}

export default function MiniCard({ product, isCart, onSelect }: MiniCardProps) {
	const { addItem, removeItem } = useContext(CartContext);
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(`/product/${product.id}`);
				onSelect?.();
			}}
			data-testid="product-card"
			className="flex flex-col sm:flex-row gap-4 my-2 items-center sm:items-start w-full bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer border-slate-200 border"
		>
			<img
				className="w-24 h-24 object-cover rounded-lg"
				src={product.imageUrl}
				alt={product.name}
			/>
			<div className="flex flex-col justify-between w-full ">
				<div className="flex justify-between items-center mb-2 ">
					<h3 className="text-lg font-bold">{product.name}</h3>
					{!product.isService && (
						<p
							data-testid="product-price"
							className="text-md font-semibold text-ocean"
						>
							R${Number(product.price).toFixed(2)}
						</p>
					)}
				</div>

				{isCart && (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<button
								onClick={(e) => {
									e.stopPropagation();
									removeItem(product as CartItem);
								}}
								data-testid="rmv-btn"
								className="bg-red-100 text-red-500 p-2 rounded-full hover:bg-red-200 transition"
							>
								<HiOutlineMinus />
							</button>
							<span
								data-testid="quantity"
								className="text-md font-medium min-w-[2ch] text-center"
							>
								{product.quantity}
							</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									addItem(product as CartItem);
								}}
								data-testid="add-btn"
								className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition"
							>
								<HiOutlinePlus />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
