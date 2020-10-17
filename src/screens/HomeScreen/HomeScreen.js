import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
// import { firebase } from '../../firebase/config';
import { logout } from '../../../redux/reducers/users';
import { connect } from 'react-redux';
import styles from './styles';

function HomeScreen(props) {
	const [allGoals, setGoals] = useState('');

	useEffect(() => {
		props.goals && setGoals(props.goals);
		console.log('allGoals: ', allGoals);
	});

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
		</>
	);
}

const mapState = (state) => ({
	user: state.user,
	goals: state.goals,
});

export default connect(mapState)(HomeScreen);
