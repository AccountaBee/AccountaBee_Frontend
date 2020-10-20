import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
		borderBottomRightRadius: 15,
		marginRight: 15,
		opacity : 0.8,
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
    alignSelf: 'center'
  }
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
