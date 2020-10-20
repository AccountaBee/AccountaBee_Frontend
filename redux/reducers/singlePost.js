import instance from "../axios";
import { firebase } from "../../src/firebase/config";

const SET_POST = "SET_POST";
const setPost = post => ({ type: SET_POSTS, post });

// create a new post on goal completion

export const newPost = (title, completedDays, targetDaysMet) => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post("/posts/newPost", {
			title,
			completedDays,
			targetDaysMet,
			token
		});
		// the user just be redirected to feed right? we aren't adding the ability for them to add stuff to their post right now?
		dispatch(setPost(data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = {}, action) {
	switch (action.type) {
		case SET_POST:
			return action.post;
		default:
			return state;
	}
}
