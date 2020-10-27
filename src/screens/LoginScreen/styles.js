import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
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
	}
});
