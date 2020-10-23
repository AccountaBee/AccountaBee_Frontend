import { firebase } from '../../src/firebase/config';
import instance from '../axios';

const GOT_GOALS = 'GOT_GOALS';
const SET_GOALS = 'SET_GOALS';
const CLEAR_GOALS = 'CLEAR_GOALS';

export const setGoals = goals => ({ type: SET_GOALS, goals });
export const gotGoals = goals => ({ type: GOT_GOALS, goals });
export const clearGoals = () => ({ type: CLEAR_GOALS });

export const setGoalsThunk = goals => async dispatch => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		let { data, status } = await instance.post('/goals', { goals, token });
		if (status === 200) {
			dispatch(setGoals(data));
		} else {
			console.log('error setting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteGoalThunk = (goalId, goals) => async dispatch => {
	try {
		let { status } = await instance.delete(`/goals/${goalId}`);

		if (status === 200) {
			console.log('goal successfully deleted');
			dispatch(gotGoals(goals.filter(goal => goalId !== goal.id)));
		} else {
			console.log('error deleting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const completedDaysThunk = goalId => async dispatch => {
	try {
		await instance.put(`goals/${goalId}`);
		let token = await firebase.auth().currentUser.getIdToken();
		const { data } = await instance.post(`/goals/allGoals`, { token });
		dispatch(gotGoals(data));
	} catch (error) {
		console.log(error);
	}
};

export const getGoalsThunk = () => async dispatch => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.post(`/goals/allGoals`, { token });
		dispatch(gotGoals(res.data));
	} catch (error) {
		console.log(error);
	}
};

export const resetGoalsThunk = uid => async dispatch => {
	try {
		const res = await instance.put(`/goals/reset`, { uid });
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
		case CLEAR_GOALS:
			return [];
		default:
			return state;
	}
}
