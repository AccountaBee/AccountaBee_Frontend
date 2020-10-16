// import axios from 'axios'

// ---------- ACTION TYPES ---------- //
const ADD_GOAL = 'ADD_GOAL'
const GOT_GOALS = 'GOT_GOALS'
const DELETE_GOAL = 'DELETE_GOAL'

// ---------- ACTION CREATORS ---------- //
const gotGoals = goals => ({type: GOT_GOALS, goals})
const addedGoal = goal => ({type: ADD_GOAL, goal})
const deletedGoal = ({type: DELETE_GOAL, goal})

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

  export default function(state = {}, action) {
    switch (action.type) {
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