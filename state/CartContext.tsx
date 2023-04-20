import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/productTypes';

type CartItem = {
	product: Product;
	size: number;
};

// Shape of the context value
type CartContextValue = {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
};

// CartContext with an initial value of undefined
const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
	children: React.ReactNode;
}

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addToCart = (item: CartItem) => {
		setCartItems((prevItems) => [...prevItems, item]);
	};

	return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
};

// useCart custom hook
export const useCart = (): CartContextValue => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
