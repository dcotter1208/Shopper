// App.tsx
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import the NavigationContainer
import AppNavigator from './components/AppNavigator'; // Import the AppNavigator component

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
