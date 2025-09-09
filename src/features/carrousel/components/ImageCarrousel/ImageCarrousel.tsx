import { useEffect, useState, useRef, type JSX } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from '../../../../shared/hooks/useIsMobile';

const images = [
	{ src: '/banner-main.webp', alt: 'Banner 1' },
	{ src: '/banner-serviços.webp', alt: 'Banner 2' },
	{ src: '/banner-controles.webp', alt: 'Banner 3' },
];

export default function ImageCarrousel(): JSX.Element {
	const [index, setIndex] = useState(0);
	const isMobile = useIsMobile(768);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startAutoSlide = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, 5000);
	};

	useEffect(() => {
		startAutoSlide();
		return () => clearInterval(intervalRef.current!);
	}, []);

	const handleChange = (newIndex: number) => {
		setIndex(newIndex);
		startAutoSlide();
	};

	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			if (eventData.dir === 'Left') handleChange((index + 1) % images.length);
			if (eventData.dir === 'Right')
				handleChange((index - 1 + images.length) % images.length);
		},
	});

	const currentImg = images[index];
	const previousImg = images[(index - 1 + images.length) % images.length];
	const nextImg = images[(index + 1) % images.length];

	return (
		<div
			data-testid="home-carrousel"
			className="flex flex-col items-center my-6 w-full max-w-6xl mx-auto px-4 overflow-hidden"
			{...handlers}
		>
			<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
				{!isMobile && (
					<button
						className="text-3xl md:text-5xl"
						aria-label="Imagem Anterior"
						onClick={() =>
							handleChange((index - 1 + images.length) % images.length)
						}
					>
						<HiChevronLeft />
					</button>
				)}

				<img
					className="hidden md:block flex-1 max-w-[150px] opacity-60 rounded-lg object-cover h-[120px] md:h-[200px]"
					src={previousImg.src}
					alt={previousImg.alt}
				/>

				<img
					className="w-full md:flex-[2] max-w-full rounded-xl object-cover h-[200px] md:h-[400px] transition-all duration-500 ease-in-out"
					src={currentImg.src}
					alt={currentImg.alt}
				/>

				<img
					className="hidden md:block flex-1 max-w-[150px] opacity-60 rounded-lg object-cover h-[120px] md:h-[200px]"
					src={nextImg.src}
					alt={nextImg.alt}
				/>

				{!isMobile && (
					<button
						className="text-3xl md:text-5xl"
						aria-label="Próxima Imagem"
						onClick={() => handleChange((index + 1) % images.length)}
					>
						<HiChevronRight />
					</button>
				)}
			</div>

			<div className="flex gap-2 mt-4">
				{images.map((_, i) =>
					i === index ? (
						<GoDotFill key={i} className="text-xl text-gray-800" />
					) : (
						<GoDot
							key={i}
							className="text-xl text-gray-400 cursor-pointer"
							onClick={() => handleChange(i)}
						/>
					)
				)}
			</div>
		</div>
	);
}
