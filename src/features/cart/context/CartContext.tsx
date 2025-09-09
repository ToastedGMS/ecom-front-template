import React, { createContext, useState } from 'react';
import type { Product } from '../../../types/Product';

interface CartProviderProps {
	children: React.ReactNode;
}

interface CartContextType {
	cartItems: Product[];
	setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
	calculateTotal: () => number;
	addItem: (item: Product) => void;
	removeItem: (itemToRemove: Product) => void;
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	setCartItems: () => {},
	calculateTotal: () => 0,
	addItem: () => {},
	removeItem: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<Product[]>([]);

	const calculateTotal = () => {
		return Number(
			cartItems.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)
		);
	};

	const addItem = (item: Product) => {
		setCartItems((prev) => {
			return [...prev, item];
		});
	};

	const removeItem = (itemToRemove: Product) => {
		setCartItems((prev) => {
			const index = prev.findIndex((item) => item.id === itemToRemove.id);

			if (index === -1) return prev;

			return [...prev.slice(0, index), ...prev.slice(index + 1)];
		});
	};

	return (
		<CartContext.Provider
			value={{ cartItems, setCartItems, calculateTotal, addItem, removeItem }}
		>
			{children}
		</CartContext.Provider>
	);
};
