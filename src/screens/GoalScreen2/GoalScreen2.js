import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../CustomButton';
import NumericInput from 'react-native-numeric-input';
import styles from './styles';
import { connect } from 'react-redux';

function GoalScreen2(props) {
	const setFrequency = (value, title) => {
		props.goals = props.goals.map((goal) => {
			if (goal.title === title) {
				goal.frequency = value;
				return goal;
			} else {
				return goal;
			}
		});
		console.log(props.goals);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={[styles.headline, styles.bigger]}>Weekly Frequency</Text>
			</View>
			<Text
				style={[
					styles.goals,
					styles.goalHeader,
					styles.breakTop,
					styles.breakBot,
				]}
			>
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
								// onChange={(value) => setFrequency(value, goal.title)}
							/>
						</View>
					</View>
				))}
			<CustomButton style={styles.nextButton} title="SET GOALS" />
		</>
	);
}

const mapState = (state) => ({
	goals: state.newGoals,
});

export default connect(mapState)(GoalScreen2);
