import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { products } from '../mockData';
import { StackParamList } from '../types/navigationTypes';
import { Product } from '../types/productTypes';
import Toolbar from './Toolbar';
import ProductItem from './ProductItem';

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
		<ProductItem item={item} itemWidth={itemWidth} onPress={() => handleProductPress(item.id)} />
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
});

export default AllProductsPage;
