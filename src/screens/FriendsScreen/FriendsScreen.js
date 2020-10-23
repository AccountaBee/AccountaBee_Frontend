import React from 'react';
import { Text, View, TextInput, Image, Alert } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { getSentRequests, sendRequest } from '../../../redux/reducers/sentRequests';
import { confirmRequest, getRequests } from '../../../redux/reducers/requests';
import { getFriends } from '../../../redux/reducers/friends';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FriendsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
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
		if (status === 'confirmed') Alert.alert('You are now friends!');
		if (status === 'denied') Alert.alert('Friend request was deleted successfully');
	};

	render() {
		const { requests } = this.props || [];
		const { friends } = this.props || [];
		return (
			<View>
				<View style={styles.headlineContainer}>
					<Text style={styles.headline}>Manage Friends</Text>
				</View>

				{requests && requests.length ? (
					<View>
						<Text style={styles.subheading}>Friend Requests</Text>
						{requests.map(request => (
							<View style={styles.requestContainer} key={request.uid}>
								<View style={styles.requestTop}>
									{request.profilePicture ? (
										<Image style={styles.photo} source={{ uri: request.profilePicture }} />
									) : (
										<Image
											style={styles.photo}
											source={require('../../../assets/blank-profile.png')}
										/>
									)}
									<Feather
										name='check'
										size={30}
										style={styles.icon}
										color='black'
										onPress={() => this.onReplyPress('confirmed', request.uid)}
									/>
									<Feather
										style={styles.icon}
										name='x'
										size={30}
										color='black'
										onPress={() => this.onReplyPress('denied', request.uid)}
									/>
								</View>
								<View style={styles.requestBottom}>
									<Text style={styles.name}>{request.firstName}</Text>
									<Text style={styles.email}>{request.email}</Text>
								</View>
							</View>
						))}
					</View>
				) : null}

				<View>
					<Text style={styles.instructions}>
						Add a buddy to hold yourself accountable! Type in your friend's email to send a request.
						Once they approve, you will be able to congratulate each other when you complete goals!
					</Text>
					<View>
						<TextInput
							onChangeText={email => this.handleChange(email)}
							style={styles.input}
							placeholder='Email'
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
