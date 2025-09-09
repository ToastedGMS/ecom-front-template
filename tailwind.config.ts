/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				ocean: '#1F6D77',
				darkOcean: '#185a62',
			},
		},
	},
	plugins: [],
};
