import QRCode from 'react-qr-code';
import type { Product } from '../../../types/Product';
import generateWhatsAppMessage from './generateMessage';

type Props = {
	items: Record<string, Product & { quantity: number }>;
	total: number;
};

export default function WhatsAppQRCode({ items, total }: Props) {
	const phone = '5531986552199';
	const message = encodeURIComponent(generateWhatsAppMessage(items, total));
	const url = `https://wa.me/${phone}?text=${message}`;

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-center text-sm">
				Escaneie para finalizar o pedido via WhatsApp:
			</p>
			<QRCode value={url} size={180} />
		</div>
	);
}
