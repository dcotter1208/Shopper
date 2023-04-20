import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllProductsPage from './AllProductsPage';
import ProductDetailView from './ProductDetailView';
import { StackParamList } from '../types/navigationTypes';
import Cart from './Cart';

const Stack = createStackNavigator<StackParamList>();

const AppNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='AllProducts' screenOptions={{ headerBackTitle: 'Back' }}>
			<Stack.Screen name='AllProducts' component={AllProductsPage} options={{ headerShown: false }} />
			<Stack.Screen name='ProductDetail' component={ProductDetailView} />
			<Stack.Screen name='Cart' component={Cart} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
