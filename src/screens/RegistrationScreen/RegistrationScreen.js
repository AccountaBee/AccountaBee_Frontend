import React, { useState } from 'react';
import { Text, TextInput, View, Image, Alert, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config';
import CustomButton from '../CustomButton';
import { registerNewUser } from '../../../redux/reducers/users';
import { connect } from 'react-redux';
import styles from './styles';

function RegistrationScreen(props) {
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onFooterLinkPress = () => {
		props.navigation.navigate('Login');
	};

	const onRegisterPress = () => {
		Keyboard.dismiss();
		if (password !== confirmPassword) {
			Alert.alert("Passwords don't match. Please try again!");
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async () => {
				let token = await firebase.auth().currentUser.getIdToken();
				const body = {
					token,
					email,
					firstName
				};
				await props.gotUser(body);
				props.navigation.navigate('All Goals');
			})
			.catch(() => {
				Alert.alert('Sorry, there was a problem creating an account. Please try again!');
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps='always'>
				<View style={styles.beeContainer}>
					<Image source={require('../../../assets/bee.png')} style={styles.bee} />
				</View>
				<Text style={styles.header}>ACCOUNTABEE</Text>
				<View>
					<TextInput
						style={styles.input}
						placeholder='First Name'
						placeholderTextColor='#aaaaaa'
						onChangeText={text => setFirstName(text)}
						value={firstName}
						underlineColorAndroid='transparent'
						autoCapitalize='none'
					/>
					<TextInput
						style={styles.input}
						placeholder='Email'
						placeholderTextColor='#aaaaaa'
						onChangeText={text => setEmail(text)}
						value={email}
						underlineColorAndroid='transparent'
						autoCapitalize='none'
					/>
					<TextInput
						style={styles.input}
						placeholderTextColor='#aaaaaa'
						secureTextEntry
						placeholder='Password'
						onChangeText={text => setPassword(text)}
						value={password}
						underlineColorAndroid='transparent'
						autoCapitalize='none'
					/>
					<TextInput
						style={styles.input}
						placeholderTextColor='#aaaaaa'
						secureTextEntry
						placeholder='Confirm Password'
						onChangeText={text => setConfirmPassword(text)}
						value={confirmPassword}
						underlineColorAndroid='transparent'
						autoCapitalize='none'
					/>
					<CustomButton
						title='CREATE ACCOUNT'
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
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const mapState = state => ({
	user: state.user
});

const mapDispatch = dispatch => ({
	gotUser: user => dispatch(registerNewUser(user))
});

export default connect(mapState, mapDispatch)(RegistrationScreen);
