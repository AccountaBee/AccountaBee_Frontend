import React from 'react';
import { Text, Alert, View } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import styles from './styles';

function ProfileScreen(props) {
	const createLogoutAlert = () => {
		Alert.alert('Are you sure you want to log out?', null, [
			{
				text: 'OK',
				onPress: async () => {
					await props.clearGoals();
					return firebase
						.auth()
						.signOut()
						.then(() => {
							console.log('You are signed out');
						});
				},
			},
			{
				text: 'Cancel',
				onPress: () => console.log('false alarm!'),
			},
		]);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Profile</Text>
			</View>
			<CustomButton
				style={styles.logout}
				title="LOG OUT"
				onPress={() => createLogoutAlert()}
			/>
		</>
	);
}

const mapDispatch = (dispatch) => ({
	clearGoals: () => dispatch(clearGoals()),
});

export default connect(null, mapDispatch)(ProfileScreen);
