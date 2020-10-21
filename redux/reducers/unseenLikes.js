import instance from '../axios';
import { firebase } from '../../src/firebase/config';

const SET_UNSEEN_LIKES = 'SET_UNSEEN_LIKES';
const setUnseenLikes = unseenLikes => ({ type: SET_UNSEEN_LIKES, unseenLikes });

export const getUnseenLikes = () => async dispatch => {
	try {
		const token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post('/likes/unseen', { token });
		const uid = await firebase.auth().currentUser.uid;
		// data should be an array of posts with their likes attached, and the user of each like attached. this ould be way overkill but we need this info for now to display the notifications
		//dispatch this thunk when the user clicks on the feed page, only display modal if length of likes is > 0

		// filter likes before dispatch to only include likes that are not the current user - no one needs a notification that they liked their own post

		let filteredData = [];
		for (let i = 0; i < data.length; i++) {
			let newPost = data[i];
			let filteredLikes = data[i].likes.filter(like => like.userUid !== uid);
			newPost.likes = filteredLikes;
			if (newPost.likes.length) {
				filteredData.push(newPost);
			}
		}

		dispatch(setUnseenLikes(filteredData));
	} catch (error) {
		console.log(error);
	}
};

//call this when user clicks on modal to close it
export const updateLikesToSeen = postsWithLikes => async dispatch => {
	try {
		// console.log('POSTSWITHLIKES', postsWithLikes);
		let likes = [];
		// convert post object including likes to one array of only likes
		for (let i = 0; i < postsWithLikes.length; i++) {
			let post = postsWithLikes[i];
			// console.log('POST', post.likes);
			likes = likes.concat(post.likes);
			console.log('LIKES ARRAY', likes);
		}

		const token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.put('/likes/update', { token, likes });
		console.log('RESPONSE', res.data);
		dispatch(setUnseenLikes([]));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_UNSEEN_LIKES:
			return action.unseenLikes;
		default:
			return state;
	}
}
