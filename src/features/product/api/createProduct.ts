export async function createProduct({
	name,
	description,
	price,
	category,
	highlight,
	onSale,
	previousPrice,
	imageFile,
	isService,
}: {
	name: string;
	description: string;
	price: string;
	category: string;
	highlight?: boolean;
	onSale?: boolean;
	previousPrice?: string;
	imageFile?: File;
	isService?: boolean;
}) {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('description', description);
	formData.append('price', price);
	formData.append('category', category);
	if (isService !== undefined) formData.append('isService', String(isService));

	if (highlight !== undefined) {
		formData.append('highlight', String(highlight));
	}
	if (onSale !== undefined) {
		formData.append('onSale', String(onSale));
	}
	if (previousPrice !== undefined) {
		formData.append('previousPrice', previousPrice);
	}
	if (imageFile) {
		formData.append('image', imageFile);
	}

	const res = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
		},
		body: formData,
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Failed to create product');
	}

	return res.json();
}
