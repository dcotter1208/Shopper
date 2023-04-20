// SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SearchBarProps = {
	onSearch: (searchText: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<View style={styles.container}>
			<Icon name='search' size={20} color='#006340' style={styles.searchIcon} />
			<TextInput style={styles.searchBar} placeholder='Search by name or brand...' onChangeText={onSearch} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	searchIcon: {
		marginRight: 8,
	},
	searchBar: {
		height: 40,
		width: '100%',
		paddingHorizontal: 8,
	},
});

export default SearchBar;
