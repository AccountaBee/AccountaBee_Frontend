import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default StyleSheet.create({
	container: {
		paddingTop: 60,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInput: {
		backgroundColor: 'white',
		width: '80%',
		padding: 5,
		height: 55,
		borderRadius: 5,
		borderColor: 'white',
		borderWidth: 1,
		fontSize: 18,
		marginRight: 0,
	},
	headline: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 10,
	},
	goals: {
		paddingTop: 10,
		fontSize: 20,
		marginLeft: 10,
	},
	breakBot: {
		marginBottom: 20,
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
		paddingVertical: 16,
		paddingHorizontal: 10,
		marginTop: 0,
		marginLeft: 0,
		backgroundColor: '#9FC78A',
	},
});
