/* eslint-disable react/display-name */
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toast from "react-native-toast-message";
import {
	LoginScreen,
	HomeScreen,
	RegistrationScreen,
	FeedScreen,
	SettingsScreen,
	GoalScreen,
	GoalScreen2,
	SingleGoalScreen,
	FriendsScreen
} from "./src/screens";
import FriendsTab from "./src/screens/FriendsScreen/FriendsIcon";
import { decode, encode } from "base-64";
import { useAuth, userContext } from "./src/context";

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const GoalStack = createStackNavigator();

// Goal-setting stack (will likely ultimately be part of the settings screen stack, but for dev purposes using a separate stack)
const GoalScreenNav = () => (
	<GoalStack.Navigator>
		{/* Why is this in the tab nav?? */}
		<GoalStack.Screen
			name="Goals1"
			component={GoalScreen}
			options={{
				animationEnabled: false,
				headerShown: false
			}}
		/>
		<GoalStack.Screen
			name="Goals2"
			component={GoalScreen2}
			options={{
				animationEnabled: false,
				headerShown: false
			}}
		/>
	</GoalStack.Navigator>
);

// Bottom of page tab navigator
const TabsScreen = () => (
	<Tabs.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color }) => {
				let iconName;
				if (route.name === "Home") {
					iconName = "pie-chart";
				} else if (route.name === "Settings") {
					iconName = "settings";
				} else if (route.name === "Feed") {
					iconName = "message-square";
				} else if (route.name === "Goals") {
					iconName = "target";
				} else if (route.name === "Single Goal") {
					iconName = "check-circle";
				} else if (route.name === "Friends") {
					iconName = "users";
				}
				color = focused ? "#9FC78A" : "#8688BC";
				return <Feather name={iconName} size={20} color={color} />;
			}
		})}
		tabBarOptions={{
			activeTintColor: "#9FC78A",
			inactiveTintColor: "#8688BC"
		}}>
		<Tabs.Screen name="Home" component={HomeScreen} />
		<Tabs.Screen
			name="Goals"
			component={GoalScreenNav}
			options={{
				animationEnabled: false,
				headerShown: false
			}}
		/>
		<Tabs.Screen name="Single Goal" component={SingleGoalScreen} />
		<Tabs.Screen name="Feed" component={FeedScreen} />
		<Tabs.Screen
			name="Friends"
			component={FriendsScreen}
			options={{
				tabBarIcon: ({ focused, color }) => {
					color = focused ? "#9FC78A" : "#8688BC";
					return (
						// STYLE & PLACEMENT ON ICON WILL BE IMPROVED
						<>
							<FriendsIcon />
							<Feather name="users" size={20} color={color} />
						</>
					);
				}
			}}
		/>
		<Tabs.Screen name="Settings" component={SettingsScreen} />
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
									name="Home"
									component={TabsScreen}
									options={{
										animationEnabled: false,
										headerShown: false
									}}
								/>
								<Stack.Screen
									name="Goals"
									component={TabsScreen}
									options={{
										animationEnabled: false,
										headerShown: false
									}}
								/>

								<Stack.Screen
									name="Tabs"
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
									name="Login"
									component={LoginScreen}
									title=""
									options={{
										animationEnabled: false,
										headerShown: false
									}}
								/>
								<Stack.Screen
									name="Registration"
									title=""
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
