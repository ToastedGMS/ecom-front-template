import { useContext } from 'react';
import MiniCard from '../../../shared/components/card/MiniCard';
import { CartContext } from '../context/CartContext';
import generateWhatsAppMessage from '../utils/generateMessage';
import WhatsAppQRCode from '../utils/generateQRCode';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import type { CartItem } from '../../../types/CartItem';
import { Helmet } from 'react-helmet-async';

export default function Cart() {
	const isMobile = useIsMobile();
	const { cartItems, calculateTotal } = useContext(CartContext);

	const groupedItems = cartItems.reduce((acc, item) => {
		if (acc[item.id]) {
			acc[item.id].quantity += 1;
		} else {
			acc[item.id] = { ...item, quantity: 1 };
		}
		return acc;
	}, {} as Record<string, CartItem>);

	const groupedArray = Object.values(groupedItems) as CartItem[];

	return (
		<>
			<Helmet>
				<title>Carrinho | Paulada Games</title>
				<meta
					name="description"
					content="Gerencie os produtos que você adicionou ao seu carrinho de compras e finalize seu pedido com facilidade."
				/>
				<meta property="og:title" content="Meu Carrinho | Paulada Games" />
				<meta
					property="og:description"
					content="Confira os itens no seu carrinho e finalize sua compra com segurança."
				/>
			</Helmet>
			<div className="flex flex-col items-center w-full px-4 py-6">
				<h2 className="text-2xl font-bold mb-6">Carrinho</h2>
				{cartItems && cartItems.length > 0 ? (
					<div className="flex flex-col w-full max-w-4xl gap-6 mb-6">
						{groupedArray.map((item) => (
							<MiniCard product={item} key={item.id} isCart={true} />
						))}
					</div>
				) : (
					<p>Ainda não tem nada por aqui...</p>
				)}

				<div className="w-full max-w-4xl flex justify-between items-center px-4">
					<p data-testid="total" className="text-xl font-semibold text-ocean">
						Total: R${calculateTotal()}
					</p>
					{cartItems && cartItems.length > 0 ? (
						<>
							<button
								data-testid="checkout-btn"
								className="bg-ocean text-white font-semibold px-6 py-2 rounded-lg hover:bg-darkOcean transition-colors duration-300"
								onClick={() => {
									const rawMessage = generateWhatsAppMessage(
										groupedItems,
										calculateTotal()
									);
									const encodedMessage = encodeURIComponent(rawMessage);
									const phone = '5531986552199';
									const url = `https://wa.me/${phone}?text=${encodedMessage}`;
									window.open(url, '_blank');
								}}
							>
								Finalizar
							</button>
							{isMobile === false && (
								<WhatsAppQRCode items={groupedItems} total={calculateTotal()} />
							)}
						</>
					) : (
						<button
							disabled
							data-testid="checkout-btn"
							className="bg-zinc-800 opacity-50 text-white font-semibold px-6 py-2 rounded-lg"
						>
							Finalizar
						</button>
					)}
				</div>
			</div>
		</>
	);
}
