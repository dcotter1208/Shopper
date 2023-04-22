import React, { memo } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Product } from '../types/productTypes';

type ProductItemProps = {
	item: Product;
	itemWidth: number;
	onPress: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ item, itemWidth, onPress }) => (
	<TouchableOpacity style={[styles.itemContainer, { width: itemWidth }]} onPress={onPress}>
		<Image style={styles.image} source={{ uri: item.image }} />
		<Text style={styles.itemName}>{item.name}</Text>
		<Text style={styles.itemPrice}>${item.price}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 16,
		marginBottom: 8,
	},
	image: {
		width: '100%',
		height: 150,
		resizeMode: 'contain',
		borderRadius: 15,
	},
	itemName: {
		fontSize: 14,
		marginTop: 8,
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: '600',
		marginTop: 8,
		color: '#006340',
	},
});

export default ProductItem;
