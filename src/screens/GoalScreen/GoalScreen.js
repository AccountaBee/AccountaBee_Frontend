import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomDelButton from '../CustomDelButton';
import CustomButton from '../CustomButton';
import { connect } from 'react-redux';
import { gotGoals, deleteGoalThunk, getGoalsThunk } from '../../../redux/reducers/goals';
import styles from './style';

function GoalScreen(props) {
	const [newGoal, setGoal] = useState('');
	const [allGoals, setAllGoals] = useState([]);

	useEffect(() => {
		const currentGoals = props.goals;
		setAllGoals(currentGoals);
	}, [props.goals]);

	const addGoalHander = () => {
		Keyboard.dismiss();
		if (!newGoal.length) return;
		if (allGoals && allGoals.length < 3) {
			let newGoalObj = {
				title: newGoal.trim(),
				frequency: 3
			};
			setAllGoals([...allGoals, newGoalObj]);
			setGoal('');
		} else {
			setGoal('');
			Alert.alert("Don't burn yourself out!\nStick to three goals at once.");
		}
	};

	const handleGoalDel = async (title, goal) => {
		if (!goal.id) {
			setAllGoals(allGoals.filter(currentGoal => currentGoal.title !== title));
		} else {
			await props.deleteGoal(goal.id, props.goals);
		}
	};

	const nextPage = () => {
		if (allGoals && allGoals.length > 0) {
			props.setGoals(allGoals);
			props.navigation.navigate('Set Frequency', { goals: allGoals });
		} else {
			Alert.alert('Please add at least one goal.');
		}
	};

	return (
		<View>
			<View style={styles.container}>
				<Text style={[styles.headline, styles.bigger]}>
					Hello{props.username ? ' ' + props.username : ''}!
				</Text>
				<Text style={styles.headline}>What does a healthy, productive week look like to you?</Text>
				<Text style={styles.headline}>Please enter up to 3 goals.</Text>
				<View style={styles.flex}>
					<TextInput
						style={styles.textInput}
						placeholder='Please enter a goal'
						onChangeText={text => setGoal(text)}
						value={newGoal}
					/>
					<CustomButton title='Add' style={styles.button} onPress={addGoalHander} />
				</View>
			</View>
			<View>
				<ScrollView>
					<View style={{ paddingBottom: 200 }}>
						<Text style={[styles.goalHeader, styles.breakBot]}>
							{allGoals.length ? 'Your Goals:' : ''}
						</Text>
						{allGoals.map((goal, idx) => (
							<View key={idx + 1}>
								<View style={styles.flexGoal}>
									<Text style={styles.goals}>
										{idx + 1}. {goal.title}
									</Text>
									<CustomDelButton onPress={() => handleGoalDel(goal.title, goal, props.goals)} />
								</View>
							</View>
						))}
						<Text style={styles.subheader}>
							Once you're happy with these goals,{'\n'}let's set their weekly frequency.
						</Text>
						<CustomButton style={styles.nextButton} title='NEXT' onPress={() => nextPage()} />
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const mapState = state => ({
	username: state.user.firstName,
	goals: state.goals
});

const mapDispatch = dispatch => ({
	getGoals: () => dispatch(getGoalsThunk()),
	setGoals: goals => dispatch(gotGoals(goals)),
	deleteGoal: (goalId, goals) => dispatch(deleteGoalThunk(goalId, goals))
});

export default connect(mapState, mapDispatch)(GoalScreen);
