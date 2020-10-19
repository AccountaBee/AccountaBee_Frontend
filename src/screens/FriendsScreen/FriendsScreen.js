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
		if (status === "confirmed") Alert.alert("You are now friends!");
		if (status === "denied") Alert.alert("Friend request was deleted successfully");
	};

	render() {
		const { sentRequests } = this.props || [];
		const { requests } = this.props || [];
		const { friends } = this.props || [];

		return (
			<View style={styles.page}>
				<View style={styles.headline_container}>
					<Text style={styles.headline}>Manage Friends</Text>
				</View>
				{/* <View style={styles.button_container}>
					<TouchableOpacity>
						<Text style={styles.friends_button}>View My Friends</Text>
					</TouchableOpacity>
				</View> */}
				{requests && requests.length ? (
					<View style={styles.sub_container}>
						<Text style={styles.subheading}>Friend Requests</Text>
						{requests.map(request => (
							<View style={styles.request_container} key={request.uid}>
								<View style={styles.request_top}>
									<Image
										style={styles.photo}
										source={require("../../../assets/blank-profile.png")}
									/>
									<Feather
										name="check"
										size={30}
										style={styles.icon}
										color="black"
										onPress={() => this.onReplyPress("confirmed", request.uid)}
									/>
									<Feather
										style={styles.icon}
										name="x"
										size={30}
										color="black"
										onPress={() => this.onReplyPress("denied", request.uid)}
									/>
								</View>
								<View style={styles.request_bottom}>
									<Text style={styles.name}>{request.firstName}</Text>
									<Text style={styles.email}>{request.email}</Text>
								</View>
							</View>
						))}
					</View>
				) : null}

				<View style={styles.sub_container}>
					{/* <Text style={styles.subheading}>Add A Friend</Text> */}
					<Text style={styles.instructions}>
						Add a buddy to hold yourself accountable! Type in your friend's email to send a request.
						Once they approve, you will be able to congratulate each other when you complete goals!
					</Text>
					<View style={styles.input_container}>
						<TextInput
							onChangeText={email => this.handleChange(email)}
							style={styles.input}
							placeholder="Email"
							placeholderTextColor="#aaaaaa"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>
						<View style={styles.button_container}>
							<TouchableOpacity onPress={() => this.onRequestPress()}>
								<Text style={styles.send}>SEND</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
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
