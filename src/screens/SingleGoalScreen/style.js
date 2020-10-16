import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
	headcontainer: {
        width: width,
		paddingTop: 60,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8688BC',
		opacity : 0.8
    },

    container: {
        width: width-50,
        paddingTop: 20,
        paddingLeft: 35,
        paddingBottom : 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
      },
    card: {
        backgroundColor: '#fff',
        paddingTop : 20,
        paddingBottom : 20,
        paddingLeft : 20,
        paddingRight : 20
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20
      },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: '#bbb'
    },
    incompleteCircle: {
        borderColor: '#DA4453'
    },
    strikeText: {
        color: '#bbb',
        textDecorationLine: 'line-through',
    },
    unstrikeText: {
        color: "#29323c"
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
		fontSize: 30,
		textAlign: 'left',
		marginBottom: 5,
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
