import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { useAuth, userContext } from './src/context'
import { Provider } from 'react-redux'
import store from './redux/store'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  //const [loading, setLoading] = useState(true)
  //const [user, setUser] = useState(null)
  const { initializing, user } = useAuth()

  if (initializing) {
    return (
    <View>
      <Text>Loading</Text>
    </View>
    )
  }

  return (
    <Provider store={store}>
      <userContext.Provider value={ { user } }>
        <NavigationContainer>
          <Stack.Navigator>
            { user ? (
              <Stack.Screen name="Home" component={HomeScreen} />
              // {/* {props => <HomeScreen {...props} extraData={user} />}
    // </Stack.Screen> */}
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </userContext.Provider>
    </Provider>
  );
}
