export function slugify(name: string) {
	return name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
}
