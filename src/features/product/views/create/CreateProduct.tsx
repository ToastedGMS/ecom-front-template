import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../category/api/fetchCategories';
import type { Category } from '../../../../types/Category';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import toast from 'react-hot-toast';
import { useCreateProduct } from '../../hooks/useCreateProduct';
const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;

export default function CreateProduct() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [imageFile, setImageFile] = useState<File | undefined>();
	const [highlight, setHighlight] = useState(false);
	const [onSale, setOnSale] = useState(false);
	const [previousPrice, setPreviousPrice] = useState('');
	const [isService, setIsService] = useState(false);

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	const createProductMutation = useCreateProduct();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !description || !price || !categoryId || !imageFile) {
			toast.error('Preencha todos os campos antes de continuar.');
			return;
		}

		createProductMutation.mutate({
			name,
			description,
			price,
			categoryId,
			imageFile,
			highlight,
			isService,
			onSale,
			previousPrice: onSale ? previousPrice : undefined,
		});
	};

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [showCropper, setShowCropper] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				setShowCropper(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCropComplete = (croppedFile: File) => {
		setImageFile(croppedFile);
		setShowCropper(false);
	};

	const handleCancelCrop = () => {
		setImagePreview(null);
		setShowCropper(false);
	};

	return (
		<div className="max-w-2xl mx-auto m-16 px-6 sm:px-8 lg:px-12">
			<div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
				<h3 className="text-2xl font-semibold text-gray-900 mb-6">
					Criar novo produto
				</h3>

				<form
					onSubmit={handleSubmit}
					data-testid="product-creation-form"
					className="space-y-6"
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nome do produto
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder="Digite o nome..."
						/>
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Descrição
						</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder="Digite a descrição..."
						/>
					</div>

					{/* Price input */}
					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Preço
						</label>
						<input
							type="number"
							step=".01"
							id="price"
							value={isService ? '0.00' : price}
							onChange={(e) => !isService && setPrice(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder={isService ? 'Serviço' : 'Ex: 99.90'}
							disabled={isService}
						/>
					</div>

					<div>
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={highlight}
								onChange={(e) => setHighlight(e.target.checked)}
							/>
							Destacar produto
						</label>
					</div>
					<div>
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={onSale}
								onChange={(e) => setOnSale(e.target.checked)}
							/>
							Produto em promoção
						</label>
					</div>
					<div>
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={isService}
								onChange={(e) => setIsService(e.target.checked)}
							/>
							Produto é um serviço
						</label>
					</div>

					{onSale && (
						<div>
							<label
								htmlFor="previousPrice"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Preço anterior
							</label>
							<input
								type="number"
								step=".01"
								id="previousPrice"
								value={previousPrice}
								onChange={(e) => setPreviousPrice(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-4 py-2"
								placeholder="Ex: 129.90"
							/>
						</div>
					)}

					<div>
						<label
							htmlFor="category"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Categoria
						</label>
						<select
							id="category"
							data-testid="category-select"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
						>
							<option value="">Selecione uma categoria</option>
							{categories?.map((category: Category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="image"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Imagem do produto
						</label>
						<input
							type="file"
							id="image"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleImageChange}
							className="w-full"
						/>
						<span>Formatos aceitos: PNG, JPEG, JPG</span>

						{showCropper && imagePreview && (
							<ImageCropper
								imageSrc={imagePreview}
								onCropComplete={handleCropComplete}
								onCancel={handleCancelCrop}
							/>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
						disabled={createProductMutation.isPending}
					>
						{createProductMutation.isPending ? 'Criando...' : 'Criar Produto'}
					</button>
				</form>

				{createProductMutation.isSuccess && (
					<div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
						<p className="text-green-700 font-medium">
							Produto criado com sucesso!
						</p>
						<button
							onClick={() => navigate(`${adminPath}/product`)}
							className="mt-2 text-sm text-blue-600 hover:underline"
						>
							Ver todos
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
