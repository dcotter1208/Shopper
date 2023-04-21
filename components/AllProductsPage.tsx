import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { products } from '../mockData';
import { StackParamList } from '../types/navigationTypes';
import { Product } from '../types/productTypes';
import Toolbar from './Toolbar';

type AllProductsPageNavigationProp = StackNavigationProp<StackParamList, 'AllProducts'>;

type AllProductsPageProps = {
	navigation: AllProductsPageNavigationProp;
};

const AllProductsPage: React.FC<AllProductsPageProps> = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');

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

	const handleProductPress = (productId: number) => {
		navigation.navigate('ProductDetail', { productId });
	};

	const renderItem = ({ item }: { item: Product }) => (
		<TouchableOpacity style={[styles.itemContainer, { width: itemWidth }]} onPress={() => handleProductPress(item.id)}>
			<Image style={styles.image} source={{ uri: item.image }} />
			<Text style={styles.itemName}>{item.name}</Text>
			<Text style={styles.itemPrice}>${item.price}</Text>
		</TouchableOpacity>
	);

	return (
		<>
			<Toolbar onSearch={setSearchText} />
			<Animated.FlatList
				data={filteredProducts}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={numColumns}
				contentContainerStyle={styles.listContainer}
				style={[styles.productList, { opacity: fadeAnim }]}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		paddingHorizontal: 16,
		backgroundColor: 'white',
	},
	productList: {
		backgroundColor: 'white',
	},
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

export default AllProductsPage;
