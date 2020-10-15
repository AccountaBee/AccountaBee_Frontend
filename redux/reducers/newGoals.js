import axios from 'axios';

// ---------- ACTION TYPES ---------- //
const SET_GOALS = 'SET_GOALS';
const SET_GOALS_IN_DB = 'SET_GOALS_IN_DB';

// ---------- ACTION CREATORS ---------- //
export const gotGoals = (goals) => ({ type: SET_GOALS, goals });

// const instance = axios.create({
// 	baseURL: "https://accountabee.herokuapp.com/api"
// });

// export const setGoals = (goals) => async dispatch => {
//   try {

//       let newGoals = await instance.post('/', {goals, token})
//     if (res.request.response === 'Wrong username and/or password') {
//       dispatch(gotUser(res.request.response))
//     } else {
//       dispatch(gotUser(res.data))
//     }
//   } catch (authError) {
//     console.error(authError)
//   }
// }

export default function (state = [], action) {
	switch (action.type) {
		case SET_GOALS:
			return action.goals;
		default:
			return state;
	}
}
