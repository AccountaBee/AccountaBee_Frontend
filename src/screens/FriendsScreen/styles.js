import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	headlineContainer: {
		paddingTop: 70,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC'
	},
	headline: {
		marginTop: 10,
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginBottom: 20
	},
	subheading: {
		fontSize: 20,
		padding: 15,
		color: '#424347'
	},
	requestContainer: {
		display: 'flex',
		borderRadius: 5,
		marginBottom: 10,
		marginHorizontal: 15,
		backgroundColor: '#FFF'
	},
	requestTop: {
		display: 'flex',
		flexDirection: 'row'
	},
	photo: {
		height: 40,
		width: 40,
		marginLeft: 10,
		marginTop: 10
	},
	icon: {
		padding: 10,
		marginLeft: 20,
		color: '#424347'
	},
	requestBottom: {
		display: 'flex',
		flexDirection: 'row'
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		margin: 10,
		color: '#424347'
	},
	email: {
		fontSize: 20,
		padding: 10,
		color: '#424347'
	},
	instructions: {
		margin: 15,
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
		color: '#424347'
	},
	input: {
		height: 48,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		fontSize: 20,
		marginHorizontal: 15,
		paddingLeft: 10
	},
	sendButton: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Avenir'
	},
	buttonContainer: {
		marginHorizontal: 15,
		marginTop: 10,
		backgroundColor: '#9FC78A',
		paddingVertical: 12,
		borderRadius: 10
	}
});
