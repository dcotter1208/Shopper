// App.tsx
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import AllProductsPage from './components/AllProductsPage';
import SearchBar from './components/SearchBar';
import Toolbar from './components/Toolbar';

export default function App() {
	const [searchText, setSearchText] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<Toolbar onSearch={setSearchText} />
			<AllProductsPage searchText={searchText} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
