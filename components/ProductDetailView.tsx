import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { products } from '../mockData';
import { StackParamList } from '../types/navigationTypes';
import { useCart } from '../state/CartContext';

type ProductDetailViewNavigationProp = StackNavigationProp<StackParamList, 'ProductDetailView'>;

type ProductDetailViewProps = {
	route: RouteProp<StackParamList, 'ProductDetail'>;
	navigation: ProductDetailViewNavigationProp;
};

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ route, navigation }) => {
	const [selectedSize, setSelectedSize] = useState<number | null>(null);
	const { addToCart } = useCart();
	const addToCartDisabledStyle = selectedSize != null ? {} : { opacity: 0.5 };

	const { productId } = route.params;
	const product = products.find((product) => product.id === productId);

	const onSizePress = (size: number) => {
		setSelectedSize(size);
	};

	const renderItem = ({ item }: { item: number }) => {
		const selectedCircleStyle = item === selectedSize ? { backgroundColor: '#006340', borderColor: 'white' } : {};
		const selectedCircleTextStyle = item === selectedSize ? { color: 'white' } : {};

		return (
			<TouchableOpacity style={[styles.sizeCircle, selectedCircleStyle]} onPress={() => onSizePress(item)}>
				<Text style={[styles.sizeText, selectedCircleTextStyle]}>{item}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{product && (
				<View style={styles.innerContainer}>
					<View style={styles.productInfoContainer}>
						<Image style={styles.productImage} source={{ uri: product.image }} />
						<Text style={styles.productName}>{product.name}</Text>
						<Text style={styles.brand}>{product.brand}</Text>
						<Text style={styles.price}>${product.price.toFixed(2)}</Text>
						<Text style={styles.sectionTitle}>Select Size</Text>
					</View>
					<FlatList
						data={product.availableSizes}
						renderItem={renderItem}
						keyExtractor={(item) => item.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.sizeSelector}
					/>
					<View style={styles.productInfoContainer}>
						<Text style={styles.sectionTitle}>Description</Text>
						<Text style={styles.description}>{product.description}</Text>
					</View>
					<TouchableOpacity
						disabled={selectedSize === null}
						style={[styles.addToCartButton, addToCartDisabledStyle]}
						onPress={() => addToCart({ product: product, size: selectedSize! })}>
						<Text style={styles.cartButtonText}>Add To Cart</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		minHeight: '100%',
		paddingBottom: 16,
	},
	innerContainer: {
		paddingTop: 16,
		paddingBottom: 16,
	},
	productInfoContainer: {
		paddingLeft: 16,
		paddingRight: 16,
	},
	productImage: {
		width: '100%',
		aspectRatio: 1,
		resizeMode: 'contain',
	},
	brand: {
		fontSize: 14,
		color: 'grey',
		marginTop: 8,
	},
	productName: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 16,
	},
	price: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 8,
		color: '#006340',
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 16,
	},
	sizeSelector: {
		marginTop: 8,
		paddingLeft: 16,
	},
	sizeCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		borderColor: 'grey',
		borderWidth: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
	},
	sizeText: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 14,
		marginTop: 8,
	},
	addToCartButton: {
		backgroundColor: '#006340',
		marginTop: 16,

		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16,

		borderRadius: 8,
	},
	cartButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default ProductDetailView;
