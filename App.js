import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
	LoginScreen,
	HomeScreen,
	RegistrationScreen,
	FeedScreen,
	SettingsScreen,
	GoalScreen,
	GoalScreen2,
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

const TabsScreen = () => (
	<Tabs.Navigator>
		<Tabs.Screen name="Dashboard" component={HomeScreen} />
		<Tabs.Screen
			name="Goals"
			component={GoalScreen}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
		<Tabs.Screen
			name="Goals2"
			component={GoalScreen2}
			options={{
				animationEnabled: false,
				headerShown: false,
			}}
		/>
		<Tabs.Screen name="Feed" component={FeedScreen} />
		<Tabs.Screen name="Settings" component={SettingsScreen} />
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
			</userContext.Provider>
		</Provider>
	);
}
