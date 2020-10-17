import React from "react";
import { Text, View, Button } from "react-native";
import CustomButton from "../CustomButton";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function SettingsScreen(props) {
	const { navigation } = props;

	const onGoalsPress = () => {
		navigation.navigate("Goals");
	};

	const onFriendsPress = () => {
		navigation.navigate("Friends");
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("You are signed out");
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Settings</Text>
			<CustomButton style={styles.button} title="Change My Goals" onPress={() => onGoalsPress()} />
			<CustomButton style={styles.button} title="Friends" onPress={() => onFriendsPress()} />
			<CustomButton style={styles.button} title="Profile" />
			<Button title="Sign Out" onPress={() => signout()} />
		</View>
	);
}

// add notifications in redux store, takes in friend's name and email and turns it into string (only active friend requests)

// Notification screen that displays all notifications with burrons to confirm friend

// ADd friends page - shows all friends
