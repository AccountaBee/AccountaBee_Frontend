import { StyleSheet } from 'react-native';

//"#9FC78A" : "#8688BC"

export default StyleSheet.create({
	headline_container: {
		paddingTop: 70,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
	},
	container: {
		display: 'flex',
	},
	sub_container: {
		display: 'flex',
	},
	subheading: {
		fontSize: 20,
		padding: 15,
		color: '#424347',
	},
	instructions: {
		margin: 15,
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
		color: '#424347',
	},

	headline: {
		marginTop: 10,
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginBottom: 20,
	},
	request_container: {
		display: 'flex',
		borderWidth: 2,
		marginBottom: 10,
		marginHorizontal: 15,
		borderColor: '#9FC78A',
	},
	request_top: {
		display: 'flex',
		flexDirection: 'row',
	},
	request_bottom: {
		display: 'flex',
		flexDirection: 'row',
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		margin: 10,
		color: '#424347',
	},
	email: {
		fontSize: 20,
		padding: 10,
		color: '#424347',
	},
	icon: {
		padding: 10,
		marginLeft: 20,
		color: '#424347',
	},
	photo: {
		height: 40,
		width: 40,
		marginLeft: 10,
		marginTop: 10,
	},
	header: {
		fontFamily: 'Avenir',
		fontWeight: '500',
		fontSize: 28,
		color: '#845cab',
		textAlign: 'center',
		marginTop: 60,
	},
	send: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},
	button_container: {
		marginHorizontal: 15,
		marginTop: 10,
		backgroundColor: '#9FC78A',
		paddingVertical: 12,
		borderRadius: 10,
	},
	friends_button: {
		fontSize: 20,
		padding: 10,
		color: 'white',
	},
	input: {
		height: 48,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		fontSize: 20,
		marginHorizontal: 15,
		// width: 305,
		paddingLeft: 10,
	},
});
