import { firebase } from "../../src/firebase/config";
import instance from "../axios";

const GOT_GOALS = "GOT_GOALS";
const SET_GOALS = "SET_GOALS";

const setGoals = goals => ({ type: SET_GOALS, goals });
export const gotGoals = goals => ({ type: GOT_GOALS, goals });

export const setGoalsThunk = goals => async dispatch => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		let { data, status } = await instance.post("/goals", { goals, token });
		if (status === 200) {
			dispatch(setGoals(data));
		} else {
			console.log("error setting goals in database, status error: ", status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteGoalThunk = goalId => async () => {
	try {
    console.log('in deletedGoalThunk');
    let { data, status } = await instance.delete(`/goals/delete/${goalId}`);
		console.log('status is: ', status);
		console.log('data is:', data);
		if (status === 200) {
      console.log('goal successfully deleted');
		} else {
			console.log("error deleting goals in database, status error: ", status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const setGoalInactiveThunk = (goalId) => async () => {
	try {
    console.log('in inactive Goal thunk');
    let { data, status } = await instance.delete(`/goals/inactivate/${goalId}`);
		console.log('status is: ', status);
		console.log('data is:', data);
		if (status === 200) {
      console.log('goal successfully saved in goal history');
		} else {
			console.log('error saving goal in database as inactive, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};


//updates the goal with completed days after user marks day off
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

//think thru logic

export const resetGoalsThunk = () => async dispatch => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		const res = await instance.put(`/goals/reset`, { token });
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
