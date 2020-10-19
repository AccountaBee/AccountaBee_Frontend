import axios from "axios";

// ---------- ACTION TYPES ---------- //
const GOT_USER = "GOT_USER";
const REMOVE_USER = "REMOVE_USER";

// ---------- ACTION CREATORS ---------- //
const gotUser = user => ({ type: GOT_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

const instance = axios.create({
	baseURL: "https://accountabee.herokuapp.com/api"
});

export const registerNewUser = user => async dispatch => {
	try {
		const { data } = await instance.post("/users/signup", user);
		dispatch(gotUser(data));
	} catch (error) {
		console.log(error);
	}
};

export const login = token => async dispatch => {
	try {
		const { data } = await instance.post("/users/login", token);

		dispatch(gotUser(data));
	} catch (authError) {
		console.error(authError);
	}
};

export const logout = () => dispatch => {
	try {
		dispatch(removeUser());
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
