import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { getRequests } from "../../../redux/reducers/requests";
import { firebase } from "../../firebase/config";
import instance from "../../../redux/axios";

function FriendsScreen(props) {
	const { navigation } = props;

	const [email, setEmail] = useState("");

	const onRequestPress = async () => {
		const token = await firebase.auth().currentUser.getIdToken();
		try {
			const res = await instance.post("/friends/request", { token, email });
			props.getRequests(token);
		} catch (error) {
			alert(error);
		}
	};

	console.log(props);
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
			<Text>Sent Requests</Text>
			<View>
				{props.requests &&
					props.requests.map(request => (
						<Text>
							{request.firstName} {request.email}
						</Text>
					))}
			</View>
		</View>
	);
}

const mapState = state => ({
	requests: state.requests
});

const mapDispatch = dispatch => ({
	getRequests: token => dispatch(getRequests(token))
});

export default connect(mapState, mapDispatch)(FriendsScreen);
