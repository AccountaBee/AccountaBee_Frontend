import instance from "../axios";

const SET_REQUESTS = "SET_REQUESTS";

const setRequests = requests => ({ type: SET_REQUESTS, requests });

export const getRequests = token => async dispatch => {
	try {
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
