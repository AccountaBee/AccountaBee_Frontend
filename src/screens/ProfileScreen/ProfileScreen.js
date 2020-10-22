import React, { useState, useEffect } from 'react';
import { Text, Alert, View, Image, Platform } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { removeUser } from '../../../redux/reducers/users';
import { connect } from 'react-redux';
import { getFriendsNum, getFriends } from '../../../redux/reducers/friends';
import CustomButton from '../CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from './styles';

function ProfileScreen(props) {
	const [friendsNum, setFriendsNum] = useState(0);
	const [image, setImage] = useState(null);

	useEffect(() => {
		setFriendsNum(props.friends.length);
		console.log('friends num: ', props.friends.length);
	}, []);

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
			// allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.cancelled) {
			setImage(result.uri);
			let localUri = result.uri;
			let filename = localUri.split('/').pop();

			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;

			// Upload the image using the fetch and FormData APIs
			let formData = new FormData();
			// Assume "photo" is the name of the form field the server expects
			formData.append('profilePicture', {
				uri: localUri,
				name: filename,
				type,
			});
			const token = await firebase.auth().currentUser.getIdToken();
			formData.append('token', token);
			console.log('form data: ', formData);
			await fetch('https://accountabee.herokuapp.com/api/users/picture', {
				method: 'PATCH',
				body: formData,
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
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
							width: 250,
							height: 250,
							borderRadius: 125,
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
				{/* <CustomButton
					title="EDIT PICTURE"
					style={styles.editPic}
					onPress={() => pickImage()}
				/> */}
				<View style={styles.section}>
					<Text style={styles.text}>Name: {props.user.firstName}</Text>
					<Text style={styles.text}>Email: {props.user.email}</Text>
					<Text style={styles.text}>Friends: {friendsNum}</Text>
					<Text style={styles.text}>Member Since: {props.user.createdAt}</Text>
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

const mapState = (state) => ({
	user: state.user,
	friends: state.friends,
});

const mapDispatch = (dispatch) => ({
	clearUser: () => dispatch(removeUser()),
	clearGoals: () => dispatch(clearGoals()),
});

export default connect(mapState, mapDispatch)(ProfileScreen);
