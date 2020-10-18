import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { sendRequest } from "../../../redux/reducers/requests";
import { firebase } from "../../firebase/config";

function FriendsScreen(props) {
	const { navigation } = props;

	const [email, setEmail] = useState("");

	const onRequestPress = async () => {
		const token = await firebase.auth().currentUser.getIdToken();
		console.log(token);
		props.sendRequest(token, email);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>My Friends</Text>
			<Text>Add a Friend! Search your friend's email to add them</Text>
			<TextInput
				onChangeText={text => setEmail(text)}
				style={styles.input}
				placeholder="email"
				placeholderTextColor="#aaaaaa"
				underlineColorAndroid="transparent"
				autoCapitalize="none"
			/>
			<Button title="Send Friend Request" onPress={() => onRequestPress()} />
			<Button title="Return to Settings" onPress={() => navigation.navigate("Settings")} />
		</View>
	);
}

const mapDispatch = dispatch => ({
	sendRequest: (token, email) => dispatch(sendRequest(token, email))
});

export default connect(null, mapDispatch)(FriendsScreen);
