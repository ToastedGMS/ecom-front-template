import type { Category } from '../../../types/Category';

export function useBuildCategoryMap(
	categories: Category[],
	slugify: (input: string) => string
): Record<string, number> {
	return categories.reduce((acc, category) => {
		acc[slugify(category.name)] = category.id;
		return acc;
	}, {} as Record<string, number>);
}
