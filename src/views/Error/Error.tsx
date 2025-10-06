import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

export default function Error() {
	const navigate = useNavigate();

	return (
		<>
			<Helmet>/* Meta Tags */</Helmet>
			<section className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-100">
				<h1 className="text-6xl font-bold text-ocean mb-4">404</h1>
				<p className="text-xl text-gray-700 mb-6">
					Oops! The page you're looking for isn't here.
				</p>
				<button
					onClick={() => navigate('/')}
					className="flex items-center gap-2 bg-ocean text-white px-6 py-2 rounded-lg hover:bg-darkOcean transition-colors duration-300"
				>
					<HiArrowLeft className="text-2xl" />
					Go back Home
				</button>
			</section>
		</>
	);
}
