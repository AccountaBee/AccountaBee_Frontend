import axios from 'axios';
import { firebase } from '../../src/firebase/config';

// ---------- ACTION TYPES ---------- //
const GOT_GOALS = 'GOT_GOALS';
const SET_GOALS = 'SET_GOALS';

// ---------- ACTION CREATORS ---------- //
const setGoals = (goals) => ({ type: SET_GOALS, goals });
export const gotGoals = (goals) => ({ type: GOT_GOALS, goals });

const instance = axios.create({
	baseURL: 'https://accountabee.herokuapp.com/api/goals/allGoals',
});

export const setGoalsThunk = (goals) => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		let { data, status } = await instance.post('/', { goals, token });
		if (status === 200) {
			dispatch(setGoals(data));
		} else {
			console.log('error setting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteGoalThunk = (goalId) => async () => {
	try {
		console.log('in deletedGoalThunk');
		let { data, status } = await instance.delete(`/${goalId}`);
		console.log('status is: ', status);
		console.log('data is:', data);
		if (status === 200) {
			console.log('goal successfully deleted');
		} else {
			console.log('error deleting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};
//updates the goal with completed days after user marks day off
export const completedDaysThunk = (goalId) => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		await instance.put(`/${goalId}`);
		const allGoals = await instance.post(`/allGoals`, { token });
		// const updatedGoal = res.data
		// const oldGoals = allGoals.filter(goal => {
		//   goal.title !== updatedGoal.title
		// })
		// const oldGoalsWithUpdatedGoal = oldGoals.push(singleGoal)
		// console.log('OLDGoalsWithUpdatedGoal:', oldGoalsWithUpdatedGoal)
		dispatch(gotGoals(allGoals));
	} catch (error) {
		console.log(error);
	}
};

export const getGoalsThunk = () => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.post(`/allGoals`, { token });
		dispatch(gotGoals(res.data));
	} catch (error) {
		console.log(error);
	}
};

// export const getSingleGoalThunk = (goalId) => async dispatch => {
//   try {
//     const res = await instance.get(`/${goalId}`)
//     dispatch(gotGoals(res.data))
//   } catch (error) {
//     console.log(error)
//   }
// }

//think thru logic
export const resetGoalsThunk = () => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.put(`/reset`, { token });
		dispatch(gotGoals(res.data));
	} catch (error) {
		console.log(error);
	}
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_GOALS:
			return action.goals;
		case GOT_GOALS:
			return action.goals;
		default:
			return state;
	}
}
