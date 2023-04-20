import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useCart } from '../state/CartContext';

const Cart: React.FC = () => {
	const { cartItems, removeFromCart } = useCart();

	const calculateTotal = () => {
		let total = 0;
		cartItems.forEach((item) => {
			total += item.product.price;
		});

		const formattedTotal = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(total);

		return formattedTotal;
	};

	const renderRightActions = (itemId: number) => (
		<TouchableOpacity
			style={styles.deleteButton}
			onPress={() => {
				Alert.alert('Delete Item', 'Are you sure you want to remove this item from the cart?', [
					{
						text: 'Cancel',
						style: 'cancel',
					},
					{
						text: 'Delete',
						onPress: () => removeFromCart(itemId),
					},
				]);
			}}>
			<Text style={styles.deleteButtonText}>Delete</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.productScrollView} showsVerticalScrollIndicator={false}>
				{cartItems.length === 0 ? (
					<Text style={styles.empty}>Your cart is empty.</Text>
				) : (
					cartItems.map((item, idx) => {
						const lastItemStyle = cartItems.length - 1 === idx ? { borderBottomWidth: 0 } : {};
						return (
							<Swipeable key={item.product.id} renderRightActions={() => renderRightActions(item.product.id)}>
								<View key={item.product.id} style={[styles.item, lastItemStyle]}>
									<View>
										<Image style={styles.itemImage} source={{ uri: item.product.image }} />
									</View>
									<View style={styles.productDetailsView}>
										<Text style={styles.itemName} numberOfLines={2}>
											{item.product.name}
										</Text>
										<Text style={styles.itemBrand}>{item.product.brand}</Text>
										<Text style={styles.itemSize}>Size: {item.size}</Text>
										<Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
									</View>
								</View>
							</Swipeable>
						);
					})
				)}
			</ScrollView>
			<View style={styles.checkoutView}>
				<Text style={styles.totalPriceText}>Total: {calculateTotal()}</Text>
				<TouchableOpacity style={styles.continueToPaymentButton}>
					<Text style={styles.continueToPaymentButtonText}>Continue to Payment</Text>
				</TouchableOpacity>
				<Text style={styles.paymentButtonHelperText}>Not a working button</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: 'white',
		minHeight: '100%',
	},
	empty: {
		fontSize: 18,
		color: 'gray',
	},
	productScrollView: {
		flex: 1,
	},
	item: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#006340',
		marginBottom: 8,
		display: 'flex',
		flexDirection: 'row',
	},
	productDetailsView: {
		flex: 1,
	},
	itemImage: {
		width: 100,
		height: 100,
		marginRight: 16,
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		flexShrink: 1,
	},
	itemBrand: {
		marginTop: 4,
		fontSize: 16,
		color: 'grey',
	},
	itemSize: {
		fontSize: 16,
		marginTop: 4,
	},
	itemPrice: {
		fontSize: 18,
		marginTop: 4,
		color: '#006340',
		fontWeight: 'bold',
	},
	checkoutView: {
		paddingTop: 16,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopColor: '#006340',
		backgroundColor: 'white',
	},
	totalPriceText: {
		fontSize: 18,
		fontWeight: 'bold',
		margin: 16,
	},
	deleteButton: {
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: '100%',
	},
	deleteButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	continueToPaymentButton: {
		backgroundColor: '#006340',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16,
		borderRadius: 8,
	},
	continueToPaymentButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	paymentButtonHelperText: {
		textAlign: 'center',
		color: 'grey',
		fontStyle: 'italic',
	},
});

export default Cart;
