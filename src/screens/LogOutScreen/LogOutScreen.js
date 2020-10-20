import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';

function LogOutScreen(props) {
	const createAlert = () => {
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
				onPress: () => props.navigation.navigate('Home'),
			},
			{ cancelable: false },
		]);
	};

	useEffect(() => {
		if (props.route.name === 'Log Out') createAlert();
	});
	return <></>;
}

const mapDispatch = (dispatch) => ({
	clearGoals: () => dispatch(clearGoals()),
});

export default connect(null, mapDispatch)(LogOutScreen);
