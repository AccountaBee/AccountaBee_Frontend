import React, { useState, useEffect } from 'react';
import { Text, Alert, View, Button, Image, Platform } from 'react-native';
import { firebase } from '../../firebase/config';
import { clearGoals } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

function ProfileScreen(props) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const {
					status,
				} = await ImagePicker.requestCameraRollPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			// allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

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
				<Text style={styles.headline}>{props.user.firstName}'s Profile</Text>
			</View>
			<View style={styles.picContainer}>
				{/* <Text style={styles.text}>Profile Picture:</Text> */}
				{image ? (
					<Image
						source={{ uri: image }}
						style={{
							width: 180,
							height: 180,
							borderRadius: 90,
							marginTop: '10%',
						}}
					/>
				) : (
					<Image
						style={{
							width: 1500,
							height: 150,
							borderRadius: 75,
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
					<Text style={styles.text}>Friends: HOW TO GET NO. FRIENDS??</Text>
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
});

const mapDispatch = (dispatch) => ({
	clearGoals: () => dispatch(clearGoals()),
});

export default connect(mapState, mapDispatch)(ProfileScreen);
