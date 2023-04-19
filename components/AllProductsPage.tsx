import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { products } from '../mockData';
import { Product } from './types/productTypes';

type AllProductsPageProps = {
	searchText: string;
};

const AllProductsPage: React.FC<AllProductsPageProps> = ({ searchText }) => {
	// Filter the product list based on the search criteria (name or brand)
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchText.toLowerCase()) || product.brand.toLowerCase().includes(searchText.toLowerCase())
	);

	const renderItem = ({ item }: { item: Product }) => (
		<View style={styles.itemContainer}>
			<Image style={styles.image} source={{ uri: item.image }} />
			<Text style={styles.itemName}>{item.name}</Text>
			<Text style={styles.itemPrice}>${item.price}</Text>
		</View>
	);

	return (
		<FlatList
			data={filteredProducts} // Use the filtered product list
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
			numColumns={2}
			contentContainerStyle={styles.listContainer}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		padding: 8,
	},
	itemContainer: {
		flex: 1,
		margin: 8,
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 16,
	},
	image: {
		width: '100%',
		height: 150,
		resizeMode: 'contain',
	},
	itemName: {
		fontSize: 14,
		marginTop: 8,
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: 600,
		marginTop: 8,
	},
});

export default AllProductsPage;
