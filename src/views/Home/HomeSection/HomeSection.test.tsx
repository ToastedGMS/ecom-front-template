import { render, screen } from '@testing-library/react';
import HomeSection from './HomeSection';
import { MemoryRouter } from 'react-router-dom';

const mockProps = {
	title: 'Adote um Pet',
	textContent: 'Dê um lar para um animal que precisa.',
	ctaBtnText: 'Veja pets disponíveis',
	ctaBtnLink: '/adocao',
	imageSrc: 'https://placehold.co/600x400?text=Adote+um+Pet',
	imageAlt: 'Adote um pet banner',
	imagePosition: 'left' as const,
	theme: 1 as const,
};

describe('HomeSection', () => {
	it('renders the section title', () => {
		render(
			<MemoryRouter>
				<HomeSection {...mockProps} />
			</MemoryRouter>
		);
		expect(screen.getByText(mockProps.title)).toBeInTheDocument();
	});

	it('renders the text content', () => {
		render(
			<MemoryRouter>
				<HomeSection {...mockProps} />
			</MemoryRouter>
		);
		expect(screen.getByText(mockProps.textContent)).toBeInTheDocument();
	});

	it('renders the CTA button with correct text and link', () => {
		render(
			<MemoryRouter>
				<HomeSection {...mockProps} />
			</MemoryRouter>
		);
		const button = screen.getByRole('link', { name: mockProps.ctaBtnText });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('href', mockProps.ctaBtnLink);
	});

	it('renders the image with correct src and alt', () => {
		render(
			<MemoryRouter>
				<HomeSection {...mockProps} />
			</MemoryRouter>
		);
		const image = screen.getByAltText(mockProps.imageAlt);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', mockProps.imageSrc);
	});
});
