import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Alert, View, Image, Platform } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { getFriendsNum } from '../../../redux/reducers/friends';
import { removeUser, getUser } from '../../../redux/reducers/users';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

async function uploadImageAsync(uri) {
	const apiUrl = `https://accountabee.herokuapp.com/api/users/picture`;
	const token = await firebase.auth().currentUser.getIdToken();

	let uriParts = uri.split('.');
	let fileType = uriParts[uriParts.length - 1];

	let formData = new FormData();
	formData.append('photo', {
		uri,
		name: `photo.${fileType}`,
		type: `image/${fileType}`,
	});
	let options = {
		method: 'POST',
		body: formData,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
			authorization: token,
		},
	};
	return fetch(apiUrl, options);
}

function ProfileScreen(props) {
	const [image, setImage] = useState(null);
	const [friendsNum, setFriendsNum] = useState(0);
	const [loaded, setLoaded] = useState(null);

	useEffect(() => {
		const func = async () => {
			if (props.user.profilePicture) {
				setImage(props.user.profilePicture);
			}
			const friends = await props.getFriends();
			setFriendsNum(friends);
			setLoaded(true);
		};
		func();
	}, []);

	useEffect(() => {
		if (props.user.profilePicture) {
			setImage(props.user.profilePicture);
		}
	}, [props.user]);

	useEffect(() => {
		const friendsFunc = async () => {
			const friends = await props.getFriends();
			setFriendsNum(friends);
		};
		friendsFunc();
	}, [props.requests]);

	const cameraRollAccess = async () => {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert(
					'Sorry, we need camera roll permissions to change your profile picture!',
					null
				);
			}
		}
	};

	const pickImage = async () => {
		cameraRollAccess();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 0,
		});
		if (!result.cancelled) {
			await uploadImageAsync(result.uri);
			await props.getUser();
		}
	};

	const createLogoutAlert = () => {
		Alert.alert('Are you sure you want to log out?', null, [
			{
				text: 'OK',
				onPress: async () => {
					await props.clearGoals();
					await props.clearUser();
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
	console.log('props.user: ', props.user);
	if (!loaded) {
		return null;
	} else {
		return (
			<>
				<View style={styles.container}>
					<Text style={styles.headline}>{props.user.firstName}'s Profile</Text>
				</View>
				<View style={styles.picContainer}>
					{image ? (
						<Image
							source={{ uri: image }}
							style={{
								width: 200,
								height: 200,
								borderRadius: 100,
								marginTop: '10%',
							}}
						/>
					) : (
						<Image
							style={{
								width: 200,
								height: 200,
								borderRadius: 100,
								marginTop: '10%',
							}}
							source={require('../../../assets/blank-profile.png')}
						/>
					)}
					<CustomButton
						title="EDIT PICTURE"
						style={styles.editPic}
						onPress={() => pickImage()}
					/>
					<View style={styles.section}>
						<Text style={styles.text}>Name: {props.user.firstName}</Text>
						<Text style={styles.text}>Email: {props.user.email}</Text>
						<Text style={styles.text}>Friends: {friendsNum}</Text>
						<Text style={styles.text}>
							Member Since:{' '}
							{new Date(props.user.createdAt).toString().slice(4, 15)}
						</Text>
					</View>
				</View>
				<CustomButton
					style={styles.logout}
					title="LOG OUT"
					onPress={() => createLogoutAlert()}
				/>
			</>
		);
	}
}

const mapState = (state) => ({
	requests: state.requests,
	user: state.user,
	friends: state.friends,
});

const mapDispatch = (dispatch) => ({
	getUser: () => dispatch(getUser()),
	getFriends: () => dispatch(getFriendsNum()),
	clearUser: () => dispatch(removeUser()),
	clearGoals: () => dispatch(clearGoals()),
});

export default connect(mapState, mapDispatch)(ProfileScreen);
