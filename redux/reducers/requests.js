import instance from "../axios";

const SET_REQUEST = "SET_REQUEST";
const SET_REQUESTS = "SET_REQUESTS";

const setRequest = requests => ({ type: SET_REQUEST, requests });

const setRequests = requests => ({ type: SET_REQUESTS, requests });

export const sendRequest = (token, email) => async dispatch => {
	try {
		const data = [{ firstName: "Val", email: "val@email.com" }];
		// const { data } = await instance.post("/request", { token, email });
		// console.log("DATA", data);
		// getting back an array of friend objects containing name and email (eventually photo!)
		dispatch(setRequest(data));
	} catch (error) {
		console.log(error);
	}
};

export const getRequests = token => async dispatch => {
	try {
		const { data } = await instance.get("/request", token);
		dispatch(setRequests(data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_REQUEST:
			return action.requests;
		case SET_REQUESTS:
			return action.requests;
		default:
			return state;
	}
}
