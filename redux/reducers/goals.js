import axios from 'axios';
import { firebase } from '../../src/firebase/config';

// ---------- ACTION TYPES ---------- //
<<<<<<< HEAD
const ADD_GOAL = 'ADD_GOAL'
const GOT_GOALS = 'GOT_GOALS'
const DELETE_GOAL = 'DELETE_GOAL'
const SET_GOALS = 'SET_GOALS';

// ---------- ACTION CREATORS ---------- //
const gotGoals = goals => ({type: GOT_GOALS, goals})
const addedGoal = goal => ({type: ADD_GOAL, goal})
const deletedGoal = ({type: DELETE_GOAL, goal})

const instance = axios.create({
	baseURL: 'https://accountabee.herokuapp.com/api',
});

export const setGoalsThunk = (goals) => async (dispatch) => {
	try {
		let token = await firebase.auth().currentUser.getIdToken();
		console.log('set a token');
		let { data, status } = await instance.post('/', { goals, token });
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

export const getGoals = (id) => async dispatch => {
  try {
    const res = await axios.get(`https://skinrx-server.herokuapp.com/api/skintypes/${id}`)
    dispatch(gotGoals(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addGoals = () => {

}

  export default function(state = [], action) {
    switch (action.type) {
      case SET_GOALS:
			  return action.goals;
      case GOT_GOALS:
        return action.user
      case ADD_GOAL:
        return {}
      case DELETE_GOAL:
        return {}
      default:
        return state
    }
  }
