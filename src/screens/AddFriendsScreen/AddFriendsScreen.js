import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";

export default function SettingsScreen(props) {
	const { navigation } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>My Friends</Text>
			<Text>Add a Friend! Search your friend's email to add them</Text>
			<TextInput
				style={styles.input}
				placeholder="email"
				placeholderTextColor="#aaaaaa"
				underlineColorAndroid="transparent"
				autoCapitalize="none"
			/>
			<Button title="Return to Settings" onPress={() => navigation.navigate("Settings")} />
		</View>
	);
}

//input field search by friend's email

// make axios request to route to get all of a user's friends, set friends in state and render on page
