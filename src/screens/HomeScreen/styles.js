import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
		borderBottomRightRadius: 15,
		marginRight: 15,
	},
	headline: {
		marginTop: 10,
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginBottom: 20,
	},
});

export const pieStyle = StyleSheet.create({
	textContainer: {
		marginTop: '9%',
		marginLeft: '8%',
		maxWidth: '44%',
	},
	container: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderColor: 'red',
		borderWidth: 2,
	},
	goalName: {
		fontSize: 20,
		paddingBottom: 15,
	},
	subhead: {
		fontSize: 16,
	},
});
