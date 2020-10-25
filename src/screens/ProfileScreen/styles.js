import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		paddingTop: '18%',
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
		fontWeight: '500',
		marginBottom: 20,
	},
	logout: {
		marginTop: '6%',
		minWidth: '40%',
		alignSelf: 'center',
	},
	editPic: {
		backgroundColor: '#424347',
		opacity: 0.6,
		minWidth: '40%',
		paddingHorizontal: 10,
		alignSelf: 'center',
	},
	picContainer: {
		minHeight: '20%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	photo: {
		marginTop: '10%',
		alignSelf: 'center',
	},
	text: {
		marginTop: '4%',
		fontSize: 0.042 * width,
		color: '#424347',
	},
	section: {
		marginTop: '10%',
		alignItems: 'center',
		marginVertical: '5%',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 80,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 80,
		borderColor: '#424347',
		paddingBottom: '5%',
	},
});
