import React from 'react';
import { useSession } from '../../context';
import { Text, View, Button } from 'react-native';
import { firebase } from '../../firebase/config';

export default function FeedScreen(props) {
	const user = useSession();

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('You are signed out');
			});
	};

	return (
		<View>
			<Text>Feed Screen</Text>
			<Button title="Sign Out" onPress={() => signout()} />
		</View>
	);
}
