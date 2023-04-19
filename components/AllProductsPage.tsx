import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Animated } from 'react-native';
import { products } from '../mockData';
import { Product } from '../types/productTypes';

type AllProductsPageProps = {
	searchText: string;
};

const AllProductsPage: React.FC<AllProductsPageProps> = ({ searchText }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchText.toLowerCase()) || product.brand.toLowerCase().includes(searchText.toLowerCase())
	);

	// Animate the opacity of the product list whenever the search results change
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1, // Fade to fully opaque
			duration: 300,
			useNativeDriver: true, // Use the native driver for performance
		}).start();
	}, [filteredProducts, fadeAnim]);

	const renderItem = ({ item }: { item: Product }) => (
		<View style={styles.itemContainer}>
			<Image style={styles.image} source={{ uri: item.image }} />
			<Text style={styles.itemName}>{item.name}</Text>
			<Text style={styles.itemPrice}>${item.price}</Text>
		</View>
	);

	return (
		<Animated.FlatList
			data={filteredProducts} // Use the filtered product list
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
			numColumns={2}
			contentContainerStyle={styles.listContainer}
			style={{ opacity: fadeAnim }} // Bind opacity to animated value
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
