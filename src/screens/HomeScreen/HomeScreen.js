import React from 'react';
import { useSession } from '../../context';
import { Text, View, Button } from 'react-native';
import { firebase } from '../../firebase/config';
import { logout } from "../../../redux/reducers/users";
import { connect } from "react-redux";

function HomeScreen(props) {
	const user = useSession();

  const signout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
        props.removeUser()
			});
	};

	return (
		<View>
			<Text>Home Screen</Text>
			<Button title="Sign Out" onPress={() => signout()}></Button>
		</View>
	);
}

const mapState = state => ({
	user: state.user
});

const mapDispatch = dispatch => ({
	removeUser: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(HomeScreen);
