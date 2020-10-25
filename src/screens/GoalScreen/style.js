import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		paddingTop: '20%',
		backgroundColor: '#8688BC',
	},
	headline: {
		marginTop: '2%',
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: '5%',
	},
	nextButton: {
		alignSelf: 'center',
		backgroundColor: '#8688BC',
		width: '50%',
		marginTop: '3%',
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginLeft: '5%',
		marginRight: '5%',
	},
	flexGoal: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	bigger: {
		fontSize: 26,
		marginBottom: 20,
	},
	subheader: {
		color: '#424347',
		fontSize: 16,
		marginLeft: '5%',
		marginTop: '6%',
		marginBottom: '3%',
	},
	textInput: {
		marginBottom: 0,
		backgroundColor: 'white',
		width: '80%',
		padding: 10,
		height: 55,
		borderRadius: 5,
		borderColor: 'white',
		borderWidth: 1,
		fontSize: 18,
		color: '#424347',
	},
	goals: {
		width: '60%',
		paddingTop: 20,
		fontSize: 18,
		marginLeft: 0,
		color: '#424347',
	},
	goalHeader: {
		marginLeft: '5%',
		fontSize: 22,
		fontWeight: '500',
	},
	breakBot: {
		marginBottom: 15,
	},
	breakTop: {
		marginTop: 20,
	},
	breakTop2: {
		marginTop: 40,
	},
	customHeader: {
		textAlign: 'center',
		fontSize: 20,
		marginTop: 100,
	},
	button: {
		alignSelf: 'flex-start',
		paddingVertical: 16,
		paddingHorizontal: 10,
		marginTop: 0,
		marginLeft: 0,
		backgroundColor: '#9FC78A',
	},
});
