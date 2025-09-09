import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { CartContext } from '../../../cart/context/CartContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import type { Product } from '../../../../types/Product';
import { Helmet } from 'react-helmet-async';

export default function ProductDetail() {
	const { id } = useParams();
	const { products, searchProducts } = useProductContext();
	const { addItem } = useContext(CartContext);

	const [readyToCheckProduct, setReadyToCheckProduct] = useState(false);

	useEffect(() => {
		if (!products || products.length === 0) {
			searchProducts();
		}
		const timer = setTimeout(() => setReadyToCheckProduct(true), 300);
		return () => clearTimeout(timer);
	}, [products, searchProducts]);

	const product = products.find((p: Product) => String(p.id) === id);

	if (!product && !readyToCheckProduct) {
		return (
			<>
				<Helmet>
					<title>Carregando Produto | Paulada Games</title>
					<meta
						name="description"
						content="Aguarde enquanto carregamos os detalhes do produto."
					/>
				</Helmet>
				<div className="flex justify-center items-center h-screen">
					<p className="text-lg text-gray-500 animate-pulse">
						Carregando produto...
					</p>
				</div>
			</>
		);
	}

	if (!product && readyToCheckProduct) {
		return (
			<>
				<Helmet>
					<title>Produto não encontrado | Paulada Games</title>
					<meta
						name="description"
						content="O produto que você está procurando pode ter sido removido ou o endereço está incorreto."
					/>
				</Helmet>
				<div className="flex justify-center items-center h-screen">
					<p className="text-lg font-semibold text-gray-600">
						Produto não encontrado.
					</p>
				</div>
			</>
		);
	}

	const handleAddToCart = () => {
		addItem({
			id: String(product.id),
			name: product.name,
			price: Number(product.price),
			imageUrl: product.imageUrl,
			description: product.description,
			isHighlight: product.isHighlight,
			onSale: product.onSale,
		});
		toast.success('Produto adicionado ao carrinho!');
	};

	return (
		<>
			<Helmet>
				<title>{product.name} | Paulada Games</title>
				<meta name="description" content={product.description} />
				<meta property="og:title" content={product.name} />
				<meta property="og:description" content={product.description} />
				<meta property="og:image" content={product.imageUrl} />
			</Helmet>
			<div className="flex flex-col md:flex-row items-center justify-center w-full px-4 py-8 gap-8 max-w-6xl mx-auto">
				{/* Product Image */}
				<div className="w-full md:w-1/2 flex justify-center">
					<img
						src={product.imageUrl}
						alt={product.name}
						className="w-full max-w-md rounded-xl shadow-lg object-cover"
					/>
				</div>

				{/* Product Info */}
				<div className="w-full md:w-1/2 flex flex-col gap-4">
					<h1 className="text-3xl font-extrabold text-zinc-800">
						{product.name}
					</h1>
					<p className="text-gray-700 text-base leading-relaxed">
						{product.description}
					</p>
					{!product.isService && (
						<>
							<p className="text-2xl font-bold text-green-600">
								R${Number(product.price).toFixed(2)}
							</p>
							{product.onSale && product.previousPrice && (
								<p className="text-sm text-red-500 line-through">
									De: R${Number(product.previousPrice).toFixed(2)}
								</p>
							)}

							<button
								onClick={handleAddToCart}
								className="mt-4 bg-zinc-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-zinc-800 transition-colors duration-300 w-fit"
							>
								Adicionar ao carrinho
							</button>
						</>
					)}

					{product.isService && (
						<button
							onClick={() => {
								const message = encodeURIComponent(
									`Olá! Gostaria de solicitar um orçamento para o serviço "${product.name}".`
								);
								window.open(
									`https://wa.me/5531986552199?text=${message}`,
									'_blank'
								);
							}}
							className="bg-zinc-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-zinc-800 transition-colors duration-300 w-fit"
						>
							Consultar Orçamento
						</button>
					)}
				</div>
			</div>
		</>
	);
}
