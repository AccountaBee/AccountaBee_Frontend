import React from 'react';
import { Text, View, TextInput, Image, Alert, Keyboard } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getSentRequests, sendRequest } from '../../../redux/reducers/sentRequests';
import { confirmRequest, getRequests } from '../../../redux/reducers/requests';
import { getFriends } from '../../../redux/reducers/friends';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

class FriendsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
	}

	async componentDidMount() {
		await this.props.getSentRequests();
		await this.props.getRequests();
		await this.props.getFriends();
	}

	handleChange = email => {
		this.setState({ email });
	};

	onRequestPress = async () => {
		Keyboard.dismiss();
		const email = this.state.email;
		await this.props.sendRequest(email);
	};

	onReplyPress = async (status, senderId) => {
		this.props.confirmRequest(status, senderId);
		if (status === 'confirmed') Alert.alert('You are now friends!');
		if (status === 'denied') {
			Alert.alert('Friend request was deleted successfully');
		}
	};

	render() {
		const { requests } = this.props || [];

		return (
			<View>
				<View style={styles.headlineContainer}>
					<Text style={styles.headline}>Manage Friends</Text>
				</View>
				<ScrollView>
					{requests && requests.length ? (
						<View>
							<Text style={styles.subheading}>Friend Requests</Text>
							{requests.map(request => (
								<View key={request.uid} style={styles.outerContainer}>
									<View style={styles.leftRequestContainer}>
										{request.profilePicture ? (
											<Image style={styles.photo} source={{ uri: request.profilePicture }} />
										) : (
											<Image
												style={styles.photo}
												source={require('../../../assets/blank-profile.png')}
											/>
										)}
										<Text style={styles.name}>{request.firstName}</Text>
									</View>
									<View style={styles.rightRequestContainer}>
										<View style={styles.iconContainer}>
											<Feather
												name='check'
												size={30}
												style={styles.icon}
												onPress={() => this.onReplyPress('confirmed', request.uid)}
											/>
											<Feather
												style={styles.iconNo}
												name='x'
												size={30}
												onPress={() => this.onReplyPress('denied', request.uid)}
											/>
										</View>
									</View>
								</View>
							))}
						</View>
					) : null}

					<View>
						<Text style={styles.instructions}>
							Add a buddy to hold yourself accountable! {'\n\n'}Once they approve, you will be able
							to encourage each other when you set and complete goals!
						</Text>
						<View>
							<TextInput
								onChangeText={email => this.handleChange(email)}
								style={styles.input}
								placeholder="Friend's email"
								placeholderTextColor='#aaaaaa'
								underlineColorAndroid='transparent'
								autoCapitalize='none'
							/>
							<View style={styles.buttonContainer}>
								<TouchableOpacity onPress={() => this.onRequestPress()}>
									<Text style={styles.sendButton}>SEND</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
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
