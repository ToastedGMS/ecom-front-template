export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	isHighlight: boolean;
	onSale: boolean;
	previousPrice?: number;
	isService?: boolean;
}
