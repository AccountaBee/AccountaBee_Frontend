import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	header: {
		flex: 1,
		height: 120,
		width: '100%',
		textAlign: 'center',
		alignSelf: 'center',
		marginBottom: 40,
		marginTop: 180,
		fontFamily: 'Avenir',
		fontWeight: '500',
		fontSize: 0.08 * width,
		color: '#8688BC',
	},

	bee: {
		width: 50,
		height: 50,
	},
});
