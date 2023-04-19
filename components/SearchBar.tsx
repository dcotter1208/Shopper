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
			<Icon name='search' size={20} color='#888' style={styles.searchIcon} />
			<TextInput style={styles.searchBar} placeholder='Search by name or brand...' onChangeText={onSearch} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchIcon: {
		marginRight: 8,
	},
	searchBar: {
		height: 40,
		width: '100%',
		border: 'none',
		paddingHorizontal: 8,
	},
});

export default SearchBar;
