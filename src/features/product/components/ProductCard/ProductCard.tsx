import { useState, useContext } from 'react';
import { HiPencil, HiTrash, HiCheck } from 'react-icons/hi';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import { useEditProduct } from '../../hooks/useEditProduct';
import { toast } from 'react-hot-toast';
import { useProductContext } from '../../context/ProductContext';
import { CartContext } from '../../../cart/context/CartContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../../types/Product';

interface ProductCardProps {
	product: Product;
	variant?: 'small' | 'normal';
	isAdmin?: boolean;
}

export default function ProductCard({
	product,
	variant = 'normal',
	isAdmin,
}: ProductCardProps) {
	const sizeClass =
		variant === 'small' ? 'scale-90 opacity-60' : 'scale-100 opacity-100';

	const { addItem } = useContext(CartContext);
	const { setProducts } = useProductContext();
	const navigate = useNavigate();

	const { mutate: deleteProduct } = useDeleteProduct();
	const { mutate: editProduct, isPending: isEditing } = useEditProduct();

	const [editId, setEditId] = useState<number | null>(null);
	const [editName, setEditName] = useState(product.name);
	const [editPrice, setEditPrice] = useState(
		product.price ? product.price.toString() : ''
	);
	const [editDescription, setEditDescription] = useState(product.description);
	const [editHighlight, setEditHighlight] = useState(
		product.isHighlight ?? false
	);
	const [editOnSale, setEditOnSale] = useState(product.onSale ?? false);
	const [editPreviousPrice, setEditPreviousPrice] = useState(
		product.previousPrice?.toString() ?? ''
	);

	const handleDelete = () => {
		if (window.confirm('Tem certeza que deseja excluir este produto?')) {
			deleteProduct(Number(product.id), {
				onSuccess: () => {
					toast.success('Produto excluído com sucesso!');
					setProducts((prev: any) =>
						prev.filter((p: any) => p.id !== product.id)
					);
				},
				onError: (err: any) =>
					toast.error(err.message || 'Erro ao excluir o produto'),
			});
		}
	};

	const handleEdit = () => {
		if (!editName.trim() || !editPrice.trim()) return;

		const formData = new FormData();
		formData.append('name', editName.trim());
		formData.append('price', editPrice.trim().replace(',', '.'));
		formData.append('description', editDescription.trim());
		formData.append('isHighlight', String(editHighlight));
		formData.append('onSale', String(editOnSale));
		if (editOnSale && editPreviousPrice.trim()) {
			formData.append(
				'previousPrice',
				editPreviousPrice.trim().replace(',', '.')
			);
		}

		editProduct(
			{ productId: Number(product.id), updateData: formData },
			{
				onSuccess: (updated) => {
					toast.success('Produto editado com sucesso!');
					setProducts((prev: any) =>
						prev.map((p: any) =>
							p.id === product.id ? { ...p, ...updated.data } : p
						)
					);
					setEditId(null);
				},
				onError: (err: any) =>
					toast.error(err.message || 'Erro ao editar o produto'),
			}
		);
	};

	const handleNavigate = () => {
		if (!isAdmin && editId === null) {
			navigate(`/product/${product.id}`);
		}
	};

	return (
		<div
			onClick={handleNavigate}
			data-testid="product-card"
			className={`flex flex-col justify-between h-full w-full max-w-sm mx-auto text-center border-2 p-4 rounded-lg shadow-lg transition-transform duration-300 hover:bg-gray-100 cursor-pointer ${sizeClass}`}
		>
			<img
				src={product.imageUrl}
				alt={product.name}
				className="rounded-xl mb-2"
			/>
			{editId === Number(product.id) ? (
				<div className="flex flex-col gap-2 mb-2">
					<input
						type="text"
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
						placeholder="Nome"
						className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isEditing}
					/>
					<input
						type="text"
						value={editPrice}
						onChange={(e) => setEditPrice(e.target.value)}
						placeholder="Preço"
						className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isEditing}
					/>
					<textarea
						value={editDescription}
						onChange={(e) => setEditDescription(e.target.value)}
						placeholder="Descrição"
						className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
						disabled={isEditing}
					/>
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={editHighlight}
							onChange={(e) => setEditHighlight(e.target.checked)}
							disabled={isEditing}
						/>
						Destacar produto
					</label>
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={editOnSale}
							onChange={(e) => setEditOnSale(e.target.checked)}
							disabled={isEditing}
						/>
						Produto em promoção
					</label>

					{editOnSale && (
						<div>
							<input
								type="number"
								step=".01"
								value={editPreviousPrice}
								onChange={(e) => setEditPreviousPrice(e.target.value)}
								placeholder="Preço anterior"
								className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
								disabled={isEditing}
							/>
						</div>
					)}

					<button
						onClick={(e) => {
							e.stopPropagation();
							setEditId(null);
							setEditName(product.name);
							setEditPrice(product.price.toString());
							setEditDescription(product.description);
							setEditOnSale(product.onSale ?? false);
							setEditPreviousPrice(product.previousPrice?.toString() ?? '');

							setEditHighlight(product.isHighlight ?? false);
						}}
						disabled={isEditing}
						className="text-gray-500 hover:text-gray-700 transition self-end"
					>
						Cancelar
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							handleEdit();
						}}
						disabled={isEditing}
						className="text-green-600 hover:text-green-800 transition self-end"
					>
						<HiCheck size={20} />
					</button>
				</div>
			) : (
				<>
					<h3 className="font-extrabold text-xl">{product.name}</h3>
					<p className="text-sm">{product.description}</p>
					{!product.isService ? (
						product.onSale && product.previousPrice ? (
							<div className="flex flex-col items-center">
								<p className="text-red-500 text-xs line-through">
									R${Number(product.previousPrice).toFixed(2)}
								</p>
								<p className="font-extrabold text-green-700">
									R${Number(product.price).toFixed(2)}
								</p>
							</div>
						) : (
							<p className="font-extrabold">
								R${Number(product.price).toFixed(2)}
							</p>
						)
					) : null}
				</>
			)}

			{isAdmin ? (
				<div className="flex justify-center gap-4 mt-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setEditId(Number(product.id));
							setEditName(product.name);
							setEditPrice(product.price?.toString() ?? '');
							setEditDescription(product.description);
						}}
						className="text-blue-600 hover:text-blue-800 transition"
						title="Editar produto"
						data-testid="edit-btn"
					>
						<HiPencil size={20} />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
						title="Excluir produto"
					>
						<HiTrash size={20} />
					</button>
				</div>
			) : (
				<button
					onClick={(e) => {
						e.stopPropagation();
						if (product.isService) {
							const message = encodeURIComponent(
								`Olá! Gostaria de solicitar um orçamento para o serviço "${product.name}".`
							);
							window.open(
								`https://wa.me/5531986552199?text=${message}`,
								'_blank'
							);
						} else {
							addItem(product);
							toast.success('Adicionado ao carrinho!');
						}
					}}
					className="bg-zinc-800 text-white py-2 px-4 rounded-lg hover:bg-zinc-900 hover:shadow-lg transition-all"
				>
					{product.isService ? 'Consultar Orçamento' : 'Adicionar ao Carrinho'}
				</button>
			)}
		</div>
	);
}
