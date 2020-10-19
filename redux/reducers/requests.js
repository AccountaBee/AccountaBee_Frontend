import instance from "../axios";
import { firebase } from "../../src/firebase/config";

const SET_REQUESTS = "SET_REQUESTS";

const setRequests = requests => ({ type: SET_REQUESTS, requests });

export const getRequests = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post("/friends/invites", { token });
		console.log("DATA", data);
		dispatch(setRequests(data));
	} catch (error) {
		console.log(error);
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
