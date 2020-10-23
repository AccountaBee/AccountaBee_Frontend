import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../CustomButton';
import NumericInput from 'react-native-numeric-input';
import styles from './styles';
import { connect } from 'react-redux';
import { setGoalsThunk } from '../../../redux/reducers/goals';
import { newGoalPost } from '../../../redux/reducers/singlePost';

function GoalScreen2(props) {
	const [allGoals, setAllGoals] = useState([]);

	useEffect(() => {
		let tempGoals = props.route.params.goals;
		setAllGoals(tempGoals);
	}, []);

	const setFrequency = (value, title) => {
		if (allGoals) {
			const newGoals = allGoals.map(goal => {
				if (goal.title === title) {
					goal.frequency = value;
					return goal;
				} else {
					return goal;
				}
			});
			setAllGoals(newGoals);
		} else {
			console.log('no goals set yet');
		}
	};

	const setGoalsPress = async () => {
		console.log(allGoals);
		await props.setGoals(allGoals);

		for (let i = 0; i < allGoals.length; i++) {
			let title = allGoals[i].title;
			let frequency = allGoals[i].frequency;
			await props.newGoalPost(title, frequency);
		}
		props.navigation.navigate('Home');
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={[styles.headline, styles.bigger]}>Weekly Frequency</Text>
			</View>
			<Text style={[styles.goals, styles.goalHeader, styles.breakTop, styles.breakBot]}>
				How many times per week do you want perform these goals?
			</Text>
			{props.goals &&
				props.goals.map((goal, idx) => (
					<View key={idx + 1}>
						<View style={styles.flex}>
							<Text style={styles.goals}>
								{idx + 1}. {goal.title}
							</Text>
							<NumericInput
								minValue={1}
								maxValue={7}
								style={styles.numberInput}
								iconStyle={{ color: '#8688BC' }}
								value={goal.frequency}
								onChange={value => setFrequency(value, goal.title)}
							/>
						</View>
					</View>
				))}
			<Text style={styles.subheader}>
				You can edit these goals at any point{'\n'} from your Goals dashboard.
			</Text>
			<CustomButton style={styles.nextButton} title='SET GOALS' onPress={() => setGoalsPress()} />
		</>
	);
}

const mapState = state => ({
	goals: state.goals
});

const mapDispatch = dispatch => ({
	setGoals: goals => dispatch(setGoalsThunk(goals)),
	newGoalPost: (title, frequency) => dispatch(newGoalPost(title, frequency))
});

export default connect(mapState, mapDispatch)(GoalScreen2);
