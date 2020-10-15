import React from "react";
import { Text, View, Button } from "react-native";
import styles from "./styles";

export default function SettingsScreen(props) {
	const { navigation } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Add Friends</Text>
		</View>
	);
}

//input field search by friend's email

// make axios request to route to get all of a user's friends, set friends in state
