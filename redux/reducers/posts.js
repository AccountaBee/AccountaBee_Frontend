import instance from '../axios';
import { firebase } from '../../src/firebase/config';

const SET_POST = 'SET_POST';
const setPost = post => ({ type: SET_POST, post });

const SET_POSTS = 'SET_POSTS';
const setPosts = posts => ({ type: SET_POSTS, posts });
const ADD_LIKE = 'ADD_LIKE';
const addLike = (postId, like) => ({ type: ADD_LIKE, payload: { postId, like } });

const REMOVE_LIKE = 'REMOVE_LIKE';
const removeLike = (postId, like) => ({ type: REMOVE_LIKE, payload: { postId, like } });

// getting posts for feed
export const getPosts = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/posts/feed', { token });
		dispatch(setPosts(data));
	} catch (error) {
		console.log(error);
	}
};
export const likePost = postId => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/likes/add', { token, postId });
		dispatch(addLike(postId, data));
	} catch (error) {
		console.log(error);
	}
};

export const unlikePost = postId => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/likes/remove', { token, postId });
		dispatch(removeLike(postId, data));
	} catch (error) {
		console.log(error);
	}
};

export const newPost = (title, completedDays, targetDaysMet) => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/posts/newPost', {
			title,
			completedDays,
			targetDaysMet,
			token
		});

		dispatch(setPost(data));
	} catch (error) {
		console.log(error);
	}
};

export const newGoalPost = (title, frequency) => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/posts/newPost', {
			title,
			completedDays: 0,
			targetDaysMet: false,
			token,
			frequency
		});
		dispatch(setPost(data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_POSTS:
			return action.posts;
		case SET_POST:
			return [...state, action.post];
		case ADD_LIKE:
			let newState = [...state];
			let post = newState.find(post => post.id === action.payload.postId);
			post.likes.push(action.payload.like);
			return newState;
		case REMOVE_LIKE:
			let newState2 = [...state];
			let post2 = newState2.find(post => post.id === action.payload.postId);
			post2.likes = post2.likes.filter(like => like.id !== action.payload.like.id);
			return newState2;
		default:
			return state;
	}
}
