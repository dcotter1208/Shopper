import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCart } from '../state/CartContext';

const Cart: React.FC = () => {
	const { cartItems } = useCart();

	return (
		<View style={styles.container}>
			{cartItems.length === 0 ? (
				<Text style={styles.empty}>Your cart is empty.</Text>
			) : (
				cartItems.map((item) => (
					<View key={item.product.id} style={styles.item}>
						<View>
							<Image style={styles.itemImage} source={{ uri: item.product.image }} />
						</View>
						<View style={styles.productDetailsView}>
							<Text style={styles.itemName} numberOfLines={2}>
								{item.product.name}
							</Text>
							<Text style={styles.itemBrand}>{item.product.brand}</Text>
							<Text style={styles.itemSize}>Size: {item.size}</Text>
							<Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
						</View>
					</View>
				))
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: 'white',
		minHeight: '100%',
	},

	empty: {
		fontSize: 18,
		color: 'gray',
	},
	item: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 8,
		display: 'flex',
		flexDirection: 'row',
	},
	productDetailsView: {
		flex: 1,
	},
	itemImage: {
		width: 100,
		height: 100,
		marginRight: 16,
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		flexShrink: 1,
	},
	itemBrand: {
		marginTop: 4,
		fontSize: 16,
		color: 'grey',
	},
	itemSize: {
		fontSize: 16,
		marginTop: 4,
	},
	itemPrice: {
		fontSize: 18,
		marginTop: 4,
		color: '#006340',
	},
});

export default Cart;
