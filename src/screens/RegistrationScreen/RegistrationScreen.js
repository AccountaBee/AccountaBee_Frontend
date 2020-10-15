import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config';
import styles from './styles';
import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://accountabee.herokuapp.com/api',
});

export default function RegistrationScreen({ navigation }) {
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onFooterLinkPress = () => {
		navigation.navigate('Login');
	};

	const onRegisterPress = () => {
		if (password !== confirmPassword) {
			alert("Passwords don't match.");
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (response) => {
				const uid = response.user.uid;
				const body = {
					uid,
					email,
					firstName,
					password,
				};

				const { data } = await instance.post('/users/signup', body);
				console.log(data);
				navigation.navigate('Goals');
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always"
			>
				<Text style={styles.header}>ACCOUNTABEE</Text>
				<TextInput
					style={styles.input}
					placeholder="First Name"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setFirstName(text)}
					value={firstName}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setEmail(text)}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Confirm Password"
					onChangeText={(text) => setConfirmPassword(text)}
					value={confirmPassword}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<CustomButton
					title="CREATE ACCOUNT"
					style={styles.button}
					onPress={() => onRegisterPress()}
				/>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Already have an account?{' '}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Log in
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
