/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message'

import {
	LoginScreen,
	HomeScreen,
	RegistrationScreen,
	FeedScreen,
	SettingsScreen,
	GoalScreen,
	GoalScreen2,
	SingleGoalScreen,
	AddFriendsScreen,
} from './src/screens';
import { decode, encode } from 'base-64';
import { useAuth, userContext } from './src/context';

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const GoalStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Goal-setting stack (will likely ultimately be part of the settings screen stack, but for dev purposes using a separate stack)
const GoalScreenNav = () => (
	<GoalStack.Navigator>
		<GoalStack.Screen
			name="Goals"
			component={GoalScreen}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
		<GoalStack.Screen
			name="Goals2"
			component={GoalScreen2}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
	</GoalStack.Navigator>
);

// creating a seperate stack so that the bottom tabs stay on the add friends screen
const SettingsScreenNav = () => (
	<SettingsStack.Navigator>
		<SettingsStack.Screen name="Settings" component={SettingsScreen} />
		<SettingsStack.Screen
			name="AddFriends"
			component={AddFriendsScreen}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
	</SettingsStack.Navigator>
);

// Bottom of page tab navigator
const TabsScreen = () => (
	<Tabs.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: () => {
				let iconName;
				if (route.name === 'Home') {
					iconName = 'pie-chart';
				} else if (route.name === 'Settings') {
					iconName = 'settings';
				} else if (route.name === 'Feed') {
					iconName = 'message-square';
				} else if (route.name === 'Goals') {
					iconName = 'target';
				}
				return <Feather name={iconName} size={20} color="white" />;
			},
		})}
		tabBarOptions={{
			activeBackgroundColor: '#8688BC',
			inactiveBackgroundColor: '#8688BC',
			activeTintColor: 'white',
			inactiveTintColor: 'white',
		}}
	>
		<Tabs.Screen name="Home" component={HomeScreen} />
		<Tabs.Screen
			name="Goals"
			component={GoalScreenNav}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
		<Tabs.Screen name="Single Goal" component={SingleGoalScreen} />
		<Tabs.Screen name="Feed" component={FeedScreen} />
		<Tabs.Screen name="Settings" component={SettingsScreenNav} />
	</Tabs.Navigator>
);

export default function App() {
	//const [loading, setLoading] = useState(true)
	//const [user, setUser] = useState(null)
	const { initializing, user } = useAuth();

	if (initializing) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}

	return (
		<Provider store={store}>
			<userContext.Provider value={{ user }}>
				<NavigationContainer>
					<Stack.Navigator>
						{user ? (
							<>
								<Stack.Screen
									name="Home"
									component={TabsScreen}
									options={{
										animationEnabled: false,
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name="Goals"
									component={GoalScreen}
									options={{
										animationEnabled: false,
										headerShown: false,
									}}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									name="Login"
									component={LoginScreen}
									title=""
									options={{
										animationEnabled: false,
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name="Registration"
									title=""
									options={{
										animationEnabled: false,
										headerShown: false,
									}}
									component={RegistrationScreen}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
			</userContext.Provider>
		</Provider>
	);
}
