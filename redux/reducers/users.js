import axios from 'axios'

// ---------- ACTION TYPES ---------- //
const GOT_USER = 'GOT_USER'

// ---------- ACTION CREATORS ---------- //
const gotUser = user => ({type: GOT_USER, user})

const instance = axios.create({
	baseURL: "https://accountabee.herokuapp.com/api"
}); 

export const registerNewUser = (user) => async dispatch => {
  console.log('IN REGISTERNEWUSER')
  try {
    const { data } = await instance.post("/users/signup", user);
    console.log('DATA', data)
    dispatch(gotUser(data))
  } catch (error) {
    console.log(error)
  }
}

export const auth = (email, password) => async dispatch => {
  try {
    if (res.request.response === 'Wrong username and/or password') {
      dispatch(gotUser(res.request.response))
    } else {
      dispatch(gotUser(res.data))
    }
  } catch (authError) {
    console.error(authError)
  }
}

// export const signUp = (firstName, lastName, email, password) => async dispatch => {
//   try {
//     const res = await axios.post(`https://skinrx-server.herokuapp.com/auth/signup`, {
//       firstName: firstName, 
//       lastName: lastName, 
//       email: email, 
//       password: password
//     })
//     dispatch(gotUser(res.data))
//   } catch (authError) {
//     console.error(authError)
//   }
// }

// export const updateUserProfile = (id, firstName, lastName, email, password) => async dispatch => {
//   let res
//   try {
//     if (password) {
//       res = await axios.put(`https://skinrx-server.herokuapp.com/auth/${id}`, {firstName, lastName, email, password})
//     } else {
//       res = await axios.put(`https://skinrx-server.herokuapp.com/auth/${id}`, {firstName, lastName, email})
//     }
//     dispatch(gotUser(res.data))
//   } catch(error) {
//     console.error(error)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     dispatch(removeUser())
//   } catch (error) {
//     console.log(error)
//   }
// }

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    default:
      return state
  }
}
