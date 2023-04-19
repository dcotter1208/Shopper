import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions } from 'react-native';
import { products } from '../mockData';
import { Product } from '../types/productTypes';

type AllProductsPageProps = {
	searchText: string;
};

const AllProductsPage: React.FC<AllProductsPageProps> = ({ searchText }) => {
	const numColumns = 2;
	const itemMargin = 8;
	const itemWidth = (Dimensions.get('window').width - (numColumns + 1) * itemMargin) / numColumns;
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
		<View style={[styles.itemContainer, { width: itemWidth }]}>
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
			numColumns={numColumns}
			contentContainerStyle={styles.listContainer}
			style={{ opacity: fadeAnim }} // Bind opacity to animated value
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 16,
	},
	itemContainer: {
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
		fontWeight: '600',
		marginTop: 8,
	},
});

export default AllProductsPage;
