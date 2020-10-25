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
		alignSelf: 'center',
		textAlign: 'center',
		marginBottom: '4%',
		maxWidth: '85%',
		// fontWeight: '500',
	},
	nextButton: {
		alignSelf: 'center',
		backgroundColor: '#8688BC',
		width: '40%',
		marginTop: '2%',
		marginBottom: 200,
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: '3%',
	},
	flexGoal: {
		marginTop: '4%',
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	bigger: {
		fontSize: 26,
		marginBottom: 20,
	},
	padding: {
		marginBottom: '20%',
	},
	subheader: {
		fontStyle: 'italic',
		color: '#424347',
		fontSize: 16,
		marginLeft: '5%',
		marginTop: '6%',
		marginBottom: '3%',
	},
	textInput: {
		marginRight: '3%',
		backgroundColor: 'white',
		width: '80%',
		padding: 10,
		height: 50,
		borderRadius: 5,
		borderColor: 'white',
		borderWidth: 1,
		fontSize: 18,
		color: '#424347',
	},
	fullScreen: {
		paddingBottom: '50%',
	},
	goalContainer: {
		borderWidth: 1,
	},
	goals: {
		width: '60%',
		fontSize: 18,
		marginLeft: 0,
		color: '#424347',
	},
	goalHeader: {
		color: '#424347',
		marginTop: '7%',
		marginLeft: '5%',
		fontSize: 22,
		fontWeight: '500',
		marginBottom: '5%',
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
		paddingVertical: 13,
		paddingHorizontal: 10,
		marginTop: 0,
		marginLeft: '2%',
		height: 50,
		backgroundColor: '#9FC78A',
	},
	safe: {
		flex: 1,
		height: '150%',
	},
});
