import instance from '../axios';
import { firebase } from '../../src/firebase/config';
import { Alert } from 'react-native';

const SET_SENT_REQUESTS = 'SET_SENT_REQUESTS';

const setSentRequests = sentRequests => ({ type: SET_SENT_REQUESTS, sentRequests });

// not currently using this reducer, but may need it later if we want to display sent requests
export const getSentRequests = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/friends/sent', { token });

		dispatch(setSentRequests(data));
	} catch (error) {
		Alert.alert(error);
	}
};

export const sendRequest = email => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		await instance.post('/friends/request', { token, email });
		dispatch(getSentRequests(token));
		Alert.alert(`You sent a friend request to ${email}!`);
	} catch (error) {
		Alert.alert(
			'Sorry, there was a problem. Are you sure that person is registered with Accountabee?'
		);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_SENT_REQUESTS:
			return action.sentRequests;
		default:
			return state;
	}
}
