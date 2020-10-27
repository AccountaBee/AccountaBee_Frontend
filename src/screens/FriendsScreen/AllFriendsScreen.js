import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getFriends } from '../../../redux/reducers/friends';
import styles from './styles';

class AllFriendsScreen extends React.Component {
	async componentDidMount() {
		await this.props.getFriends();
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
	friends: state.friends
});

const mapDispatch = dispatch => ({
	getFriends: () => dispatch(getFriends())
});

export default connect(mapState, mapDispatch)(AllFriendsScreen);
