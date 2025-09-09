import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Initial check
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		checkScreenSize();

		// Update on resize
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, [breakpoint]);

	return isMobile;
}
