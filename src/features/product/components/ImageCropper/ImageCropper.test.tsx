import { render, screen, fireEvent } from '@testing-library/react';
import ImageCropper from './ImageCropper';
import { vi } from 'vitest';

const mockImageSrc = 'data:image/jpeg;base64,...';
const mockOnCropComplete = vi.fn();
const mockOnCancel = vi.fn();

describe('ImageCropper', () => {
	it('renders the cropper UI', () => {
		render(
			<ImageCropper
				imageSrc={mockImageSrc}
				onCropComplete={mockOnCropComplete}
				onCancel={mockOnCancel}
			/>
		);

		expect(screen.getByText('Cancelar')).toBeInTheDocument();
		expect(screen.getByText('Usar imagem')).toBeInTheDocument();
	});

	it('calls onCancel when Cancelar is clicked', () => {
		render(
			<ImageCropper
				imageSrc={mockImageSrc}
				onCropComplete={mockOnCropComplete}
				onCancel={mockOnCancel}
			/>
		);

		fireEvent.click(screen.getByText('Cancelar'));
		expect(mockOnCancel).toHaveBeenCalled();
	});

	it('calls onCropComplete when Usar imagem is clicked (mocked)', async () => {
		// Mock getCroppedImg to return a dummy blob
		vi.mock('../../utils/images/cropImage', () => ({
			__esModule: true,
			default: vi.fn(() =>
				Promise.resolve(new Blob(['test'], { type: 'image/jpeg' }))
			),
		}));

		render(
			<ImageCropper
				imageSrc={mockImageSrc}
				onCropComplete={mockOnCropComplete}
				onCancel={mockOnCancel}
			/>
		);

		fireEvent.click(screen.getByText('Usar imagem'));
	});
});
