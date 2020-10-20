import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
	headcontainer: {
		paddingTop: 71,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
	},
	headline: {
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	container: {
		width: width,
		marginTop: 10,
		paddingBottom: 5,
		paddingLeft: 35,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	day: {
		flexDirection: 'row',
	},
	text: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 20,
		position: 'relative',
		bottom: '5%',
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: 'red',
		borderWidth: 3,
		marginRight: 20,
	},
	completeCircle: {
		borderColor: '#bbb',
	},
	incompleteCircle: {
		borderColor: '#DA4453',
	},
	strikeText: {
		color: '#bbb',
		textDecorationLine: 'line-through',
	},
	unstrikeText: {
		color: '#29323c',
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
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	modalView: {
		flex: 1,
		width: '100%',
		maxHeight: deviceHeight * 0.6,
		backgroundColor: 'lightgrey',
		opacity: 0.9,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 0,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginTop: 20,
		marginBottom: 15,
		textAlign: 'center',
		color: 'white',
		fontSize: 40,
	},
	modalInnerText: {
		marginBottom: 12,
		textAlign: 'center',
		color: 'white',
		fontSize: 20,
	},
	xbutton: {
		marginTop: 20,
	},
	nextButton: {
		alignSelf: 'center',
		backgroundColor: '#8688BC',
		width: '80%',
		padding: 50,
	},
});
