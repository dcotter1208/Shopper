import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../types/navigationTypes';
import { useCart } from '../state/CartContext';

type ToolbarProps = {
	onSearch?: (searchText: string) => void;
	showSearchBar: boolean;
};

type ToolbarNavigationProp = StackNavigationProp<StackParamList, 'Cart'>;

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, showSearchBar }) => {
	const navigation = useNavigation<ToolbarNavigationProp>();
	const { cartItems } = useCart();
	const cartItemsCount = cartItems.length;

	const handleCartPress = () => {
		navigation.navigate('Cart'); // Navigate to the Cart screen
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
				<Ionicons name='cart-outline' size={28} color='#000' />
				{cartItemsCount > 0 && ( // Show the badge only if there are items in the cart
					<View style={styles.badge}>
						<Text style={styles.badgeText}>{cartItemsCount}</Text>
					</View>
				)}
			</TouchableOpacity>
			{showSearchBar && <SearchBar onSearch={onSearch} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		backgroundColor: 'white',
	},
	cartButton: {
		backgroundColor: 'white',
		alignSelf: 'flex-end',
		color: '#white',
		paddingTop: 8,
		paddingBottom: 8,
		paddingRight: 24,
		position: 'relative',
	},
	badge: {
		position: 'absolute', // Position the badge over the cart icon
		top: 4, // Adjust these values as needed to position the badge
		right: 15,
		backgroundColor: '#006340',
		borderRadius: 10, // To make the badge circular
		width: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	badgeText: {
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold',
	},
});

export default Toolbar;
