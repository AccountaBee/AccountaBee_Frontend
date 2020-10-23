import React, { useState, useEffect } from 'react';
import { Text, Alert, View, Image, Platform } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { removeUser } from '../../../redux/reducers/users';
import { connect } from 'react-redux';
import { getFriendsNum, getFriends } from '../../../redux/reducers/friends';
import CustomButton from '../CustomButton';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

function ProfileScreen(props) {
	const [friendsNum, setFriendsNum] = useState(0);
	const [image, setImage] = useState(null);

	useEffect(() => {
		console.log('user: ', props.user);
		if (props.user.profilePicture) {
			setImage(props.user.profilePicture);
		}
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
			quality: 0,
		});
		if (!result.cancelled) {
			async function uploadImageAsync(uri) {
				let apiUrl = `https://accountabee.herokuapp.com/api/users/picture`;
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

			const testreturn = await uploadImageAsync(result.uri);
			// console.log('testreturn: ', testreturn.json());
			// console.log('testreturn: ', testreturn.blob());
			// var reader = new FileReader();
			// reader.readAsDataURL(blob);
			// reader.onloadend = function () {
			// 	var base64data = reader.result;
			// 	console.log(base64data);
			// };

			// let image = await testreturn.json();
			// let image2 = await testreturn.blob();
			// // console.log('image: ', image);
			// console.log('image 2: ', image2);
			// // // console.log('image', image);
			// let url = URL.createObjectURL(image2);
			// setImage(url);
			// console.log('image: ', image);
			// setImage(image);
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
