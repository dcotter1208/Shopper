// SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
	onSearch: (searchText: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.searchBar} placeholder='Search by name or brand...' onChangeText={onSearch} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
	},
	searchBar: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 8,
	},
});

export default SearchBar;
