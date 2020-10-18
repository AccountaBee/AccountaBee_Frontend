import instance from "../axios";

const SET_FRIENDS = "SET_FRIENDS";

const setFriends = friends => ({ type: SET_FRIENDS, friends });

export const getFriends = token => async dispatch => {
	try {
		// should return an array of friends
		const { data } = await instance.post("/friends", { token });
		console.log("DATA", data);
		dispatch(setFriends(data));
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
