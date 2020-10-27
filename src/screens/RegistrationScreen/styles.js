import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	header: {
		width: '100%',
		height: '20%',
		textAlign: 'center',
		alignSelf: 'center',
		marginTop: '6%',
		fontFamily: 'Avenir',
		fontWeight: '500',
		fontSize: 0.08 * width,
		color: '#8688BC'
	},
	input: {
		color: '#424347',
		height: 48,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingLeft: 16
	},
	button: {
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8688BC'
	},
	buttonTitle: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	footerView: {
		flex: 1,
		alignItems: 'center',
		marginTop: 20
	},
	footerText: {
		fontSize: 16,
		color: '#424347'
	},
	footerLink: {
		color: '#8688BC',
		fontWeight: 'bold',
		fontSize: 16
	},
	beeContainer: {
		marginTop: '25%',
		alignItems: 'center'
	},
	bee: {
		width: 50,
		height: 50
	},
	inputContainer: {
		alignSelf: 'flex-end'
	}
});
