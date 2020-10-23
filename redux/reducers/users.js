import instance from '../axios';
import { firebase } from '../../src/firebase/config';
import { Alert } from 'react-native';

const GOT_USER = 'GOT_USER';
const REMOVE_USER = 'REMOVE_USER';

const gotUser = (user) => ({ type: GOT_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

export const getUser = () => async (dispatch) => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/users/login', { token });
		dispatch(gotUser(data));
	} catch (error) {
		Alert.alert('Sorry, there was a problem signing in. Please try again.');
	}
};

export const registerNewUser = (user) => async (dispatch) => {
	try {
		const { data } = await instance.post('/users/signup', user);
		dispatch(gotUser(data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = {}, action) {
	switch (action.type) {
		case GOT_USER:
			return action.user;
		case REMOVE_USER:
			return {};
		default:
			return state;
	}
}
