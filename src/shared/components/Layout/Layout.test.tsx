import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { vi } from 'vitest';

vi.mock('../header/Header', async () => {
	const actual = await vi.importActual('../header/Header');
	return {
		...actual,
		default: () => <header role="banner">Mocked Header</header>,
	};
});

vi.mock('../../context/ProductContext', async () => {
	const actual = await vi.importActual('../../context/ProductContext');
	return {
		...actual,
		useProductContext: () => ({
			setProducts: vi.fn(),
			products: [],
			searchProducts: vi.fn(),
		}),
	};
});

import Layout from './Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Layout Component', () => {
	beforeEach(() => {
		const client = new QueryClient();
		render(
			<QueryClientProvider client={client}>
				<MemoryRouter>
					<Layout />
				</MemoryRouter>
			</QueryClientProvider>
		);
	});
	it('renders a header', () => {
		expect(screen.getByRole('banner')).toBeInTheDocument();
	});
	it('renders a footer', () => {
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	});
	it('footer element is not empty', () => {
		expect(screen.getByRole('contentinfo')).not.toBeEmptyDOMElement();
	});
	it('footer contains a copyright notice', () => {
		expect(screen.getByRole('contentinfo')).toHaveTextContent(
			`© ${new Date().getFullYear()} Paulada Games. All rights reserved.`
		);
	});
});
