import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
	button: {
		marginLeft: 0,
		marginTop: 20,
		backgroundColor: '#845cab',
		paddingVertical: 12,
		borderRadius: 10,
	},
	buttonText: {
		fontWeight: '600',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},
});

const CustomButton = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.width}>
			<View style={{ ...styles.button, ...props.style }}>
				<Text style={{ ...styles.buttonText, ...props.textStyle }}>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;
