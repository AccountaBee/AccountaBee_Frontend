import instance from '../axios';
import { firebase } from '../../src/firebase/config';

// ---------- ACTION TYPES ---------- //
const SET_FRIENDS = 'SET_FRIENDS';

const setFriends = (friends) => ({ type: SET_FRIENDS, friends });

export const getFriends = () => async (dispatch) => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		// should return an array of friends
		const { data } = await instance.post('/friends', { token });
		dispatch(setFriends(data));
	} catch (error) {
		console.log(error);
	}
};

// returns the number of friends a user has (does not set to Redux state)
export const getFriendsNum = () => async (dispatch) => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/friends/number', { token });
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_FRIENDS:
			return action.friends;
		default:
			return state;
	}
}
