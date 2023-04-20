import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from './SearchBar';

type ToolbarProps = {
	onSearch: (searchText: string) => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ onSearch }) => {
	return (
		<View style={styles.container}>
			<SearchBar onSearch={onSearch} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: '#006340',
		backgroundColor: 'white',
	},
});

export default Toolbar;
