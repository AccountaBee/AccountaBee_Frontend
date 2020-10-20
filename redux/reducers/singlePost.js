import instance from "../axios";
import { firebase } from "../../src/firebase/config";
import { getPosts } from "./posts";

const SET_POST = "SET_POST";
const setPost = post => ({ type: SET_POST, post });

// create a new post on goal completion

export const newPost = (title, completedDays, targetDaysMet) => async dispatch => {
	try {
		console.log("IN NEWPOST");
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

export const likePost = postId => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.post("/likes/add", { token, postId });
		dispatch(getPosts());
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
