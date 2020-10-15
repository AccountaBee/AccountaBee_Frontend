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
