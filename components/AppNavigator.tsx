import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllProductsPage from './AllProductsPage';
import ProductDetailView from './ProductDetailView';
import { StackParamList } from '../types/navigationTypes';
import Cart from './Cart';
import CartButtonWithBadge from './CartButtonWithBadge';

const Stack = createStackNavigator<StackParamList>();

const AppNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='AllProducts'
			screenOptions={({ navigation }) => ({
				headerBackTitle: 'Back',
				headerRight: () => <CartButtonWithBadge navigation={navigation} />,
			})}>
			<Stack.Screen
				name='AllProducts'
				component={AllProductsPage}
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						borderBottomWidth: 0,
						shadowOpacity: 0,
					},
				}}
			/>
			<Stack.Screen name='ProductDetail' component={ProductDetailView} options={{ headerTitle: '' }} />
			<Stack.Screen name='Cart' component={Cart} options={{ headerTitle: '' }} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
