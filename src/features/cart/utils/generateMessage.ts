import type { Product } from '../../../types/Product';
export default function generateWhatsAppMessage(
	items: Record<string, Product & { quantity: number }>,
	total: number
) {
	let message =
		'Olá, gostaria de finalizar a compra com os seguintes itens:\n\n';

	for (const item of Object.values(items)) {
		message += `• ${item.name} (x${item.quantity}) - R$${Number(
			item.price
		).toFixed(2)}\n`;
	}

	message += `\nTotal: R$${total.toFixed(2)}\n\nObrigado!`;

	return message;
}
