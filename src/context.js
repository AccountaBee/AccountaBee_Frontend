import { firebase } from './firebase/config'
import React, { useEffect, useState, useContext } from 'react'
 
//create context
export const userContext = React.createContext({
  user: null
})

//creates hook that allows us to access context
export const useSession = () => {
  const { user } = useContext(userContext)
  return user
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user
    }
  })

  function onChange(user) {
    setState({ initializing: false, user })
  }

  // function onChange(user) {
  //   setState({ user })
  // }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}