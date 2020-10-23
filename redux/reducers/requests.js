import instance from '../axios';
import { firebase } from '../../src/firebase/config';
import { getPosts } from './posts';
import { Alert } from 'react-native';

const SET_REQUESTS = 'SET_REQUESTS';

const setRequests = requests => ({ type: SET_REQUESTS, requests });

export const getRequests = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/friends/invites', { token });
		dispatch(setRequests(data));
	} catch (error) {
		console.log(error);
	}
};

export const confirmRequest = (status, senderId) => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		await instance.put('/friends/reply', { token, senderId, status });
		dispatch(getRequests(token));
		dispatch(getPosts());
	} catch (error) {
		console.log(error);
		Alert.alert('sorry, there was a problem accepting this request. Please try again.');
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_REQUESTS:
			return action.requests;
		default:
			return state;
	}
}
