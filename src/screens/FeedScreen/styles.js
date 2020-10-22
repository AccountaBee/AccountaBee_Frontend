import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
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
	row: {
		flexDirection: 'row'
	},
	text: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 20,
		position: 'relative',
		bottom: '5%'
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
		marginRight: 0
	},
	button: {
		paddingVertical: 16,
		paddingHorizontal: 10,
		marginTop: 0,
		marginLeft: 0,
		backgroundColor: '#9FC78A'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	modalView: {
		flex: 1,
		width: '100%',
		maxHeight: height * 0.6,
		backgroundColor: '#8688BC',
		opacity: 0.9,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 0
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginTop: 25,
		marginBottom: 5,
		textAlign: 'center',
		color: 'white',
		fontSize: 20
	},
	modalInnerTextContainer: {
		borderRadius: 5,
		padding: 8,
		marginVertical: 8,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'space-between'
	},
	modalInnerText: {
		marginBottom: 12,
		textAlign: 'left',
		color: 'white',
		fontSize: 20,
		marginTop: 10,
		flexDirection: 'row'
	},
	xbutton: {
		marginTop: 20
	},
	clapImage: {
		width: 25,
		height: 25,
		justifyContent: 'center',
		marginRight: 5,
		marginTop: 10
	},
	clapNumber: {
		marginTop: 13,
		fontSize: 12
	},
	viewAllComments: {
		marginTop: 10,
		marginBottom: 10,
		fontSize: 12
	},
	feedItem: {
		backgroundColor: '#FFF',
		borderRadius: 5,
		padding: 8,
		flexDirection: 'row',
		marginVertical: 8,
		marginLeft: 10,
		marginRight: 10
	},
	feedContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	userName: {
		fontSize: 15,
		fontWeight: '500',
		color: '#454D65'
	},
	userImage: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 16
	},
	post: {
		marginTop: 10,
		fontSize: 16,
		color: '#838899'
	}
});
