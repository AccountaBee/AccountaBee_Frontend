import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import CustomButton from '../CustomButton';
import styles from './style';
import { useSession } from '../../context';

export default function GoalScreen(props) {
	const [newGoal, setGoal] = useState('');
	const [allGoals, setAllGoals] = useState([]);

	const user = useSession();

	const addGoalHander = () => {
		if (allGoals.length < 3) {
			let newGoalObj = {
				id: allGoals.length + 1,
				goal: newGoal.trim(),
				frequency: 3,
			};
			setAllGoals([...allGoals, newGoalObj]);
			setGoal('');
		} else {
			alert("Don't burn yourself out! Stick to three goals at once.");
		}
	};

	const typeHandler = (text) => {
		console.log(text);
		setGoal(text);
	};

	const handleGoalDel = (delIdx) => {
		setAllGoals(allGoals.filter((goal) => goal.id !== delIdx));
	};

	const buttonTitle = allGoals.length ? 'Set Goals >>' : '';
	console.log('user: ', user);
	return (
		<View style={styles.container}>
			<Text style={styles.headline}>Hello, {user.email}!</Text>
			<Text style={styles.headline}>
				What goals do you have that will help you to have a healthy, productive
				week?
			</Text>
			<Text style={styles.headline}>Please enter up to 3 goals.</Text>
			<View style={styles.breakBot} />
			<View style={styles.flex}>
				<TextInput
					style={styles.textInput}
					placeholder="Please enter a goal"
					onChangeText={(text) => typeHandler(text)}
					value={newGoal}
				/>
				<CustomButton
					title="Add"
					style={styles.button}
					onPress={addGoalHander}
				/>
			</View>
			<View>
				<Text style={[styles.goals, styles.breakTop, styles.breakBot]}>
					{allGoals.length ? 'Your Goals:' : ''}
				</Text>
				{allGoals.map((goal) => (
					<View key={goal.id}>
						<View style={styles.flex}>
							<Text style={styles.goals}>
								{goal.id}. {goal.goal}
							</Text>
							<Button
								color="red"
								title="Del"
								onPress={() => handleGoalDel(goal.id)}
							/>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}

// SECOND PAGE
// const setFrequency = (value, id) => {
//     setAllGoals(
//         allGoals.map((goal) => {
//             if (goal.id === id) {
//                 goal.frequency = value;
//                 return goal;
//             } else {
//                 return goal;
//             }
//         })
//     );
//     console.log(allGoals);
// };

// <Text style={styles.goals}>
// 								How many times per week do you want to {goal.goal}?
// 							</Text>
// 							<Dropdown
// 								data={dropdownFrequency}
// 								value={goal.frequency}
// 								useNativeDriver={true}
// 								onChangeText={(value) => setFrequency(value, goal.id)}
// 							/>

// THIRD PAGE
// const [startDay, setStartDay] = useState('Monday');
// const setDay = (day) => {
//     setStartDay(day);
//     console.log(startDay);
// };

// const dropdownDays = [
//     { label: 'Sunday', value: 'sunday' },
//     { label: 'Monday', value: 'monday' },
//     { label: 'Tuesday', value: 'tuesday' },
//     { label: 'Wednesday', value: 'wednesday' },
//     { label: 'Thursday', value: 'thursday' },
//     { label: 'Friday', value: 'friday' },
//     { label: 'Saturday', value: 'saturday' },
// ];

// <Text style={styles.headline}>
// Lastly, what day do you want your week to start on?
// </Text>
// <Dropdown
// data={dropdownDays}
// value={startDay}
// useNativeDriver={true}
// onChangeText={(value) => setDay(value)}
// />
// <Button title={buttonTitle} color="blue" />
