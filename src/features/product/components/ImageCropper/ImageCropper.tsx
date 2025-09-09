import Cropper, { type Area } from 'react-easy-crop';
import { useState, useCallback } from 'react';
import getCroppedImg from '../../utils/cropImage';

interface ImageCropperProps {
	imageSrc: string;
	onCropComplete: (croppedFile: File) => void;
	onCancel: () => void;
}

export default function ImageCropper({
	imageSrc,
	onCropComplete,
	onCancel,
}: ImageCropperProps) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
		setCroppedAreaPixels(croppedPixels);
	}, []);

	const handleDone = async () => {
		if (!croppedAreaPixels) return;
		const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
		const croppedFile = new File([croppedBlob], 'cropped.jpg', {
			type: 'image/jpeg',
		});
		onCropComplete(croppedFile);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
			<div className="bg-white rounded-lg w-[90vw] h-[90vh] relative overflow-hidden">
				{/* Cropper container */}
				<div className="absolute inset-0">
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={1}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={handleCropComplete}
					/>
				</div>

				{/* Buttons container */}
				<div className="absolute bottom-4 right-4 flex gap-4 z-10">
					<button
						onClick={onCancel}
						className="px-4 py-2 bg-gray-300 rounded shadow"
					>
						Cancelar
					</button>
					<button
						onClick={handleDone}
						className="px-4 py-2 bg-blue-600 text-white rounded shadow"
					>
						Usar imagem
					</button>
				</div>
			</div>
		</div>
	);
}
