/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';
import {
	LoginScreen,
	HomeScreen,
	RegistrationScreen,
	FeedScreen,
	LogOutScreen,
	GoalScreen,
	GoalScreen2,
	SingleGoalScreen,
	FriendsScreen,
	FeedIcon,
	FriendsIcon
} from './src/screens';

import { decode, encode } from 'base-64';
import { useAuth, userContext } from './src/context';

LogBox.ignoreAllLogs();

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const GoalStack = createStackNavigator();

const GoalScreenNav = () => (
	<GoalStack.Navigator
		initialRouteName='Home'
		screenOptions={{
			title: '',
			headerBackAllowFontScaling: true,
			headerBackTitleStyle: {
				fontSize: 16
			},
			headerTransparent: true,
			headerTintColor: 'white'
		}}>
		<GoalStack.Screen
			name='Home'
			component={HomeScreen}
			options={{
				title: ''
			}}
		/>
		<GoalStack.Screen name='Single Goal' component={SingleGoalScreen} options={{ title: '' }} />
		<GoalStack.Screen name='Set Goals' component={GoalScreen} options={{ title: '' }} />
		<GoalStack.Screen name='Set Frequency' component={GoalScreen2} options={{ title: '' }} />
	</GoalStack.Navigator>
);

// Bottom of page tab navigator
const TabsScreen = () => (
	<Tabs.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color }) => {
				let iconName;
				if (route.name === 'Goals') {
					iconName = 'check-circle';
				} else if (route.name === 'Log Out') {
					iconName = 'log-out';
				} else if (route.name === 'Feed') {
					iconName = 'message-square';
				} else if (route.name === 'Friends') {
					iconName = 'users';
				}
				color = focused ? '#9FC78A' : '#8688BC';
				return <Feather name={iconName} size={20} color={color} />;
			}
		})}
		tabBarOptions={{
			activeTintColor: '#9FC78A',
			inactiveTintColor: '#8688BC'
		}}>
		<Tabs.Screen name='Goals' component={GoalScreenNav} />
		<Tabs.Screen
			name='Feed'
			component={FeedScreen}
			options={{
				tabBarIcon: ({ focused, color }) => {
					color = focused ? '#9FC78A' : '#8688BC';
					return (
						<>
							<FeedIcon focused={focused} />
						</>
					);
				}
			}}
		/>
		<Tabs.Screen
			name='Friends'
			component={FriendsScreen}
			options={{
				tabBarIcon: ({ focused, color }) => {
					color = focused ? '#9FC78A' : '#8688BC';
					return (
						<>
							<FriendsIcon focused={focused} />
						</>
					);
				}
			}}
		/>
		<Tabs.Screen name='Log Out' component={LogOutScreen} initialParams={{ logout: true }} />
	</Tabs.Navigator>
);

export default function App() {
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
									name='Tabs'
									component={TabsScreen}
									options={{
										animationEnabled: false,
										headerShown: false
									}}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									name='Login'
									component={LoginScreen}
									title=''
									options={{
										animationEnabled: false,
										headerShown: false
									}}
								/>
								<Stack.Screen
									name='Registration'
									title=''
									options={{
										animationEnabled: false,
										headerShown: false
									}}
									component={RegistrationScreen}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
				<Toast ref={ref => Toast.setRef(ref)} />
			</userContext.Provider>
		</Provider>
	);
}
