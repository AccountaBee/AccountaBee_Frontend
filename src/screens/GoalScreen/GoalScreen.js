import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import CustomDelButton from '../CustomDelButton';
import CustomButton from '../CustomButton';
import styles from './style';
import { connect } from 'react-redux';
import { gotGoals, deletedGoalThunk } from '../../../redux/reducers/goals';

function GoalScreen(props, { navigation }) {
	const [newGoal, setGoal] = useState('');
	const [allGoals, setAllGoals] = useState([]);

	const addGoalHander = () => {
		if (allGoals.length < 3) {
			let newGoalObj = {
				title: newGoal.trim(),
				frequency: 3,
			};
			setAllGoals([...allGoals, newGoalObj]);
			setGoal('');
		} else {
			setGoal('');
			alert("Don't burn yourself out!\nStick to three goals at once.");
		}
	};

	const handleGoalDel = (title, id) => {
    setAllGoals(allGoals.filter((goal) => goal.title !== title));
    removeGoal(id)
	};

	const nextPage = async () => {
		if (allGoals.length > 0) {
			await props.setGoals(allGoals);
			props.navigation.navigate('Goals2');
		} else {
			alert('Please add at least one goal.');
		}
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={[styles.headline, styles.bigger]}>
					Hello{props.username ? ' ' + props.username : ''}!
				</Text>
				<Text style={styles.headline}>
					What goals do you have that will {'\n'}help you to have a healthy,
					{'\n'}productive week?
				</Text>
				<Text style={styles.headline}>Please enter up to 3 goals.</Text>
				<View style={[styles.flex]}>
					<TextInput
						style={[styles.textInput, styles.breakBot]}
						placeholder="Please enter a goal"
						onChangeText={(text) => setGoal(text)}
						value={newGoal}
					/>
					<CustomButton
						title="Add"
						style={styles.button}
						onPress={addGoalHander}
					/>
				</View>
			</View>
			<View>
				<Text
					style={[
						styles.goals,
						styles.goalHeader,
						styles.breakTop,
						styles.breakBot,
					]}
				>
					{allGoals.length ? 'Your Goals:' : ''}
				</Text>
				{allGoals.map((goal, idx) => (
					<View key={idx + 1}>
						<View style={styles.flex}>
							<Text style={styles.goals}>
								{idx + 1}. {goal.title}
							</Text>
							<CustomDelButton onPress={() => handleGoalDel(goal.title, goal.id)} />
						</View>
					</View>
				))}
				<Text style={styles.subheader}>
					Once you're happy with these goals,{'\n'}let's set their weekly
					frequency.
				</Text>
				<CustomButton
					style={styles.nextButton}
					title="NEXT"
					onPress={() => nextPage()}
				/>
			</View>
		</>
	);
}

const mapState = (state) => ({
	username: state.user.firstName,
});

const mapDispatch = (dispatch) => ({
  setGoals: (goals) => dispatch(gotGoals(goals)), 
  removeGoal: (id) => dispatch(deletedGoalThunk(id))
});

export default connect(mapState, mapDispatch)(GoalScreen);
