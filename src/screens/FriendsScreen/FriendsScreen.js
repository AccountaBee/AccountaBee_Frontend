import React from "react";
import { Text, View, TextInput, Button, Image, Alert } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { getSentRequests, sendRequest } from "../../../redux/reducers/sentRequests";
import { confirmRequest, getRequests } from "../../../redux/reducers/requests";
import { getFriends } from "../../../redux/reducers/friends";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

//TODO - add loading icon because it takes a second to load requests
//TODO - make confirm/deny buttons nice icons
//TODO - better error handling messages on backend
//TODO - let users upload photo???
//TODO - style

class FriendsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ""
		};
	}

	async componentDidMount() {
		this.props.getSentRequests();
		this.props.getRequests();
		this.props.getFriends();
	}

	handleChange = email => {
		this.setState({ email });
	};

	onRequestPress = async () => {
		const email = this.state.email;
		this.props.sendRequest(email);
	};

	onReplyPress = async (status, senderId) => {
		this.props.confirmRequest(status, senderId);
		if (status === "confirmed") Alert.alert("You are now buddies!");
		if (status === "denied") Alert.alert("Buddy request was deleted successfully");
	};

	render() {
		const { sentRequests } = this.props || [];
		const { requests } = this.props || [];
		const { friends } = this.props || [];

		return (
			<>
				<View style={styles.headline_container}>
					<Text style={styles.headline}>Manage Friends</Text>
				</View>
				<View>
					<>
						{friends.map(friend => (
							<View key={friend.uid}>
								<Text>{friend.firstName}</Text>
							</View>
						))}
					</>
					<Text>Add an accountability buddy! Type in your friend's email to add them</Text>
					<View style={styles.input_container}>
						<TextInput
							onChangeText={email => this.handleChange(email)}
							style={styles.input}
							placeholder="email"
							placeholderTextColor="#aaaaaa"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>
						<Button title="Send" style={styles.button} onPress={() => this.onRequestPress()} />
					</View>

					<>
						<Text>Friend Requests</Text>
						{requests.map(request => (
							<View style={styles.request_container} key={request.uid}>
								<Image style={styles.photo} source={require("../../../assets/blank-profile.png")} />
								<Text style={styles.name}>{request.firstName}</Text>
								<Text style={styles.email}>{request.email}</Text>
								<Feather
									name="check"
									size={24}
									style={styles.icon}
									color="black"
									onPress={() => this.onReplyPress("confirmed", request.uid)}
								/>
								<Feather
									style={styles.icon}
									name="x"
									size={24}
									color="black"
									onPress={() => this.onReplyPress("denied", request.uid)}
								/>
							</View>
						))}
					</>
					<>
						<Text>Sent Requests</Text>
						{sentRequests.map(request => (
							<View key={request.uid}>
								<Text>
									{request.firstName} {request.email}
								</Text>
								<Button title="Delete Request" />
							</View>
						))}
					</>
					<TouchableOpacity>
						<Text>View All My Friends</Text>
					</TouchableOpacity>
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

export default connect(mapState, mapDispatch)(FriendsScreen);
