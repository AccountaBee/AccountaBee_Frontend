import React from "react";
import { Text, View, Button } from "react-native";
import CustomButton from "../CustomButton";
import styles from "./styles";

export default function SettingsScreen(props) {
	const { navigation } = props;

	const onGoalsPress = () => {
		navigation.navigate("Goals");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Settings</Text>
			<CustomButton style={styles.button} title="Change My Goals" onPress={() => onGoalsPress()} />
			<CustomButton style={styles.button} title="Add Friends" />
			<CustomButton style={styles.button} title="Update Profile" />
		</View>
	);
}

// need button to route to goal screen

// button for adding a friend
