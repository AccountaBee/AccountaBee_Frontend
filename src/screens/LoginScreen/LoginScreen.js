import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import CustomButton from "../CustomButton";
import { firebase } from "../../firebase/config";
import { getUser } from "../../../redux/reducers/users";
import { connect } from "react-redux";
import Bee from "../BeeScreen/Bee"

function LoginScreen(props, { navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onFooterLinkPress = () => {
		props.navigation.navigate("Registration");
	};

	const onLoginPress = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async () => {
				await props.getUser();
				props.navigation.navigate("Home");
			})
			.catch(() => {
				alert("Sorry your email or password are incorrect. Please check again!");
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always">
				{/* <Text style={styles.header}>ACCOUNTABEE</Text> */}

				<View>
					<Bee/>
				</View>

				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={text => setEmail(text)}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Password"
					onChangeText={text => setPassword(text)}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<CustomButton title="LOG IN" style={styles.button} onPress={() => onLoginPress()} />
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Don't have an account?{" "}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Sign up
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const mapState = state => ({
	user: state.user
});

const mapDispatch = dispatch => ({
	getUser: () => dispatch(getUser())
});

export default connect(mapState, mapDispatch)(LoginScreen);
