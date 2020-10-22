import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		paddingTop: 70,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
		zIndex: -1,
	},
	headline: {
		marginTop: 10,
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginBottom: 20,
	},
	noGoals: {
		color: '#424347',
		fontSize: 20,
		marginTop: '40%',
		textAlign: 'center',
		maxWidth: '80%',
		alignSelf: 'center',
	},
	button: {
		width: '50%',
		marginTop: 20,
		backgroundColor: '#8688BC',
		alignSelf: 'center',
		marginBottom: '30%',
	},
	fullScreen: {
		paddingBottom: 120,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 40,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalText: {
		color: '#424347',
		fontSize: 18,
		marginBottom: 15,
		textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#8688BC'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
});

export const pieStyle = StyleSheet.create({
	textContainer: {
		display: 'flex',
		justifyContent: 'center',
		textAlignVertical: 'center',
		marginLeft: '8%',
		maxWidth: '44%',
	},
	container: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderBottomWidth: 0.5,
		borderColor: '#424347',
	},
	goalName: {
		fontWeight: '500',
		color: '#424347',
		fontSize: 20,
		paddingBottom: 15,
	},
	subhead: {
		color: '#424347',
		marginTop: 10,
		fontSize: 16,
  },
});
