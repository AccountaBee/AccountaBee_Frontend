import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { getSentRequests } from "../../../redux/reducers/sentRequests";
import { getRequests } from "../../../redux/reducers/requests";
import { firebase } from "../../firebase/config";
import instance from "../../../redux/axios";

class FriendsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ""
		};
	}

	async componentDidMount() {
		const token = await firebase.auth().currentUser.getIdToken();
		this.props.getSentRequests(token);
		this.props.getRequests(token);
	}

	handleChange = text => {
		this.setState({ email: text });
	};

	onRequestPress = async () => {
		const email = this.state.email;
		const token = await firebase.auth().currentUser.getIdToken();
		try {
			const res = await instance.post("/friends/request", { token, email });
			this.props.getSentRequests(token);
		} catch (error) {
			alert(error);
		}
	};

	render() {
		const { navigation } = this.props;
		const { sentRequests } = this.props || [];
		const { requests } = this.props || [];
		return (
			<View style={styles.container}>
				<Text style={styles.header}>My Friends</Text>
				<Text>Add a Friend! Search your friend's email to add them</Text>
				<TextInput
					onChangeText={text => this.handleChange(text)}
					style={styles.input}
					placeholder="email"
					placeholderTextColor="#aaaaaa"
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Button title="Send Friend Request" onPress={() => this.onRequestPress()} />
				<Button title="Return to Settings" onPress={() => navigation.navigate("Settings")} />
				<Text>Friend Requests</Text>
				<View>
					{requests.map(request => (
						<Text key={request.uid}>
							{request.firstName} {request.email}
						</Text>
					))}
				</View>
				<Text>Sent Requests</Text>
				<View>
					{sentRequests.map(request => (
						<Text key={request.uid}>
							{request.firstName} {request.email}
						</Text>
					))}
				</View>
			</View>
		);
	}
}

const mapState = state => ({
	sentRequests: state.sentRequests,
	requests: state.requests
});

const mapDispatch = dispatch => ({
	getSentRequests: token => dispatch(getSentRequests(token)),
	getRequests: token => dispatch(getRequests(token))
});

export default connect(mapState, mapDispatch)(FriendsScreen);
