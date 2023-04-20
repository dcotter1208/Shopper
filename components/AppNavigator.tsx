// AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllProductsPage from './AllProductsPage';
import ProductDetailView from './ProductDetailView';
import { StackParamList } from '../types/navigationTypes';

const Stack = createStackNavigator<StackParamList>();

const AppNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='AllProducts'>
			<Stack.Screen name='AllProducts' component={AllProductsPage} options={{ headerShown: false }} />
			<Stack.Screen name='ProductDetail' component={ProductDetailView} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
