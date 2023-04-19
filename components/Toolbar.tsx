import React, { useState } from 'react';
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
		paddingTop: 8,
		paddingLeft: 8,
		paddingRight: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
});

export default Toolbar;
