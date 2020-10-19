import React from "react";
import { Text, View, TextInput, Button, Image, Alert } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { getSentRequests, sendRequest } from "../../../redux/reducers/sentRequests";

import { getFriends } from "../../../redux/reducers/friends";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

class AllFriendsScreen extends React.Component {
	async componentDidMount() {
		this.props.getFriends();
	}

	render() {
		const { friends } = this.props || [];

		return (
			<>
				<View style={styles.headline_container}>
					<Text style={styles.headline}>My Friends</Text>
				</View>
				<View>
					<>
						{friends.map(friend => (
							<View key={friend.uid}>
								<Text>{friend.firstName}</Text>
							</View>
						))}
					</>
				</View>
			</>
		);
	}
}

const mapState = state => ({
	sentRequests: state.sentRequests,
	requests: state.requests,
	friends: state.friends,
	user: state.user
});

const mapDispatch = dispatch => ({
	getSentRequests: () => dispatch(getSentRequests()),
	getRequests: () => dispatch(getRequests()),
	getFriends: () => dispatch(getFriends()),
	sendRequest: email => dispatch(sendRequest(email)),
	confirmRequest: (status, senderId) => dispatch(confirmRequest(status, senderId))
});

export default connect(mapState, mapDispatch)(AllFriendsScreen);
