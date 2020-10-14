import React from 'react'
import { useSession } from '../../context'
import { Text, View } from 'react-native'

export default function HomeScreen(props) {
  const user = useSession()  
  console.log('USER', user)
  return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}