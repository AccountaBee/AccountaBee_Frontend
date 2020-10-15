import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import CustomButton from '../CustomButton';
import styles from './styles';
import { connect } from 'react-redux';

export default function GoalScreen2({ route }) {
	const [allGoals, setGoals] = useState(route.goals);

	// const setFrequency = (value, id) => {
	// 	setAllGoals(
	// 		allGoals.map((goal) => {
	// 			if (goal.id === id) {
	// 				goal.frequency = value;
	// 				return goal;
	// 			} else {
	// 				return goal;
	// 			}
	// 		})
	// 	);
	// 	console.log(allGoals);
	// };
	// console.log('route.goals: ', route.params);
	// console.log('route.params: ', route.params);
	return (
		<>
			<Text style={styles.goals}>
				How many times per week do you want to do this?
			</Text>
			<CustomButton title="SET GOALS" />
		</>
		// <Dropdown
		// 	data={dropdownFrequency}
		// 	value={goal.frequency}
		// 	useNativeDriver={true}
		// 	onChangeText={(value) => setFrequency(value, goal.id)}
		// />
	);
}
