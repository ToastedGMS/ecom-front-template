import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/fetchCategories';
import type { Category } from '../../../types/Category';
import type { ReactNode } from 'react';
import { slugify } from '../../../shared/utils/slugify';

export const SlugMapContext = createContext<Record<string, number> | null>(
	null
);

export const useSlugMap = () => {
	const context = useContext(SlugMapContext);
	if (!context) {
		throw new Error('useSlugMap must be used within a SlugMapProvider');
	}
	return context;
};

export function SlugMapProvider({ children }: { children: ReactNode }) {
	const { data: categories = [] } = useQuery<Category[]>({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	const slugMap = categories.reduce<Record<string, number>>((acc, category) => {
		acc[slugify(category.name)] = category.id;
		return acc;
	}, {});

	return (
		<SlugMapContext.Provider value={slugMap}>
			{children}
		</SlugMapContext.Provider>
	);
}
