import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../state/CartContext';
import { StackParamList } from '../types/navigationTypes';

type CartButtonNavigationProp = StackNavigationProp<StackParamList, 'Cart'>;

type CareButtonWithBadgeProps = {
	navigation: CartButtonNavigationProp;
};

const CartButtonWithBadge: React.FC<CareButtonWithBadgeProps> = ({ navigation }) => {
	const { cartItems } = useCart();
	const cartItemCount = cartItems.length;

	const handleCartPress = () => {
		navigation.navigate('Cart');
	};

	return (
		<TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
			<Ionicons name='cart-outline' size={28} color='#000' />
			{cartItemCount > 0 && (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{cartItemCount}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
		position: 'absolute',
		top: 4,
		right: 15,
		backgroundColor: '#006340',
		borderRadius: 10,
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

export default CartButtonWithBadge;
