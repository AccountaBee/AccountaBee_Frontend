import axios from 'axios';
import { firebase } from '../../src/firebase/config';

// ---------- ACTION TYPES ---------- //
const GOT_GOALS = 'GOT_GOALS'
const DELETE_GOAL = 'DELETE_GOAL'

// ---------- ACTION CREATORS ---------- //
const gotGoals = goals => ({type: GOT_GOALS, goals})
const deletedGoal = goals = ({type: DELETE_GOAL, goals})

const instance = axios.create({
	baseURL: 'https://accountabee.herokuapp.com/api/goals',
});

export const setGoalsThunk = (goals) => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		console.log('set a token');
		console.log('goals: ', goals);
		let { data, status } = await instance.post('/goals/', { goals, token });
		console.log('status is: ', status);
		if (status === 200) {
			dispatch(gotGoals(data));
		} else {
			console.log('error setting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteGoalThunk = (id) => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		console.log('in deletedGoalThunk');
		let { data, status } = await instance.post('/', { goals, token });
		console.log('status is: ', status);
		if (status === 200) {
			dispatch(deletedGoal(data));
		} else {
			console.log('error deleting goals in database, status error: ', status);
		}
	} catch (error) {
		console.error(error);
	}
}
//updates the goal with completed days after user marks day off
export const completedDaysThunk = (goalId) => async dispatch => {
  try {
    const res = await instance.put(`/${goalId}`)
    let token = await firebase.auth().currentUser.getIdToken();
    const allGoals = await instance.get(`/`, { token })
    const singleGoal = res.data
    const oldGoals = allGoals.filter(goal => {
      goal.title !== singleGoal.title
    })
    const oldGoalsWithUpdatedGoal = oldGoals.push(singleGoal)
    console.log('OLDGoalsWithUpdatedGoal:', oldGoalsWithUpdatedGoal)
    dispatch(gotGoals(oldGoalsWithUpdatedGoal))
  } catch (error) {
    console.log(error)
  }
}

//think thru logic, look at params
export const getGoalsThunk = () => async dispatch => {
  try {
    let token = await firebase.auth().currentUser.getIdToken();
    const res = await instance.get(`/`, { token })
    dispatch(gotGoals(res.data))
  } catch (error) {
    console.log(error)
  }
}

// export const getSingleGoalThunk = (goalId) => async dispatch => {
//   try {
//     const res = await instance.get(`/${goalId}`)
//     dispatch(gotGoals(res.data))
//   } catch (error) {
//     console.log(error)
//   }
// }

//think thru logic
export const resetGoalsThunk = () => async dispatch => {
  try {
    let token = await firebase.auth().currentUser.getIdToken();
    const res = await instance.put(`/reset`, { token })
    dispatch(gotGoals(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_GOALS:
      return action.goals
    case DELETE_GOAL:
      return {}
    default:
      return state
  }
}
