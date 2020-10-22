import instance from '../axios';
import { firebase } from '../../src/firebase/config';

const SET_POSTS = 'SET_POSTS';
const setPosts = posts => ({ type: SET_POSTS, posts });

// getting posts for feed
export const getPosts = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/posts/feed', { token });
		// data should be an array of posts with their likes attached
		console.log(data);
		dispatch(setPosts(data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_POSTS:
			return action.posts;
		default:
			return state;
	}
}
