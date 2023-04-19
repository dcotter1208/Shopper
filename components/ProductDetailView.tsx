import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { products } from '../mockData';
import { StackParamList } from '../types/navigationTypes';

type ProductDetailViewProps = {
	route: RouteProp<StackParamList, 'ProductDetail'>;
};

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ route }) => {
	const { productId } = route.params;
	const product = products.find((product) => product.id === productId);

	const renderItem = ({ item }: { item: number }) => (
		<View style={styles.sizeCircle}>
			<Text style={styles.sizeText}>{item}</Text>
		</View>
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{product && (
				<>
					<Image style={styles.productImage} source={{ uri: product.image }} />
					<Text style={styles.brand}>{product.brand}</Text>
					<Text style={styles.productName}>{product.name}</Text>
					<Text style={styles.price}>${product.price.toFixed(2)}</Text>
					<Text style={styles.sectionTitle}>Select Size</Text>
					<FlatList
						data={product.availableSizes}
						renderItem={renderItem}
						keyExtractor={(item) => item.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.sizeSelector}
					/>
					<Text style={styles.sectionTitle}>Description</Text>
					<Text style={styles.description}>{product.description}</Text>
				</>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	productImage: {
		width: '100%',
		aspectRatio: 1,
		resizeMode: 'contain',
	},
	brand: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 16,
	},
	productName: {
		fontSize: 16,
		marginTop: 8,
	},
	price: {
		fontSize: 16,
		color: 'grey',
		marginTop: 8,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 16,
	},
	sizeSelector: {
		marginTop: 8,
	},
	sizeCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
	},
	sizeText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 14,
		marginTop: 8,
	},
});

export default ProductDetailView;
