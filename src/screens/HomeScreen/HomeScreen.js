import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import GoalPieChart from './PieChart';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import { getGoalsThunk } from '../../../redux/reducers/goals';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getUser } from '../../../redux/reducers/users';
import ConfettiCannon from 'react-native-confetti-cannon';

const pieCalculations = (completedDays, frequency) => {
	const pieData = [],
		graphicColor = [];
	for (let i = 1; i <= frequency; i++) {
		pieData.push({ x: i, y: 1 });
		if (completedDays) {
			graphicColor.push('#9FC78A');
			completedDays--;
		} else {
			graphicColor.push('#DCDCDC');
		}
	}
	return [pieData, graphicColor];
};

function HomeScreen(props) {
	const [explode, setExplosion] = useState(false);
	const [pieGoals, setPieGoals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			await props.getGoals();
			await props.getUser();
			console.log('You caused a reboot!!!');
		}
		fetchData();
	}, []);

	useEffect(() => {
		setPieGoals(props.goals);
		if (
			props.goals.length &&
			props.goals.every((goal) => goal.completedDays >= goal.frequency) &&
			!explode
		) {
			setExplosion(true);
		} else {
			setExplosion(false);
		}
	}, [props.goals]);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
			<View style={styles.fullScreen}>
				<ScrollView style={styles.fullScreen}>
					{props.goals.length ? (
						props.goals
							.sort((a, b) => a.id - b.id)
							.map((goal) => {
								if (goal.status === 'active') {
									const [data, graphicColor] = pieCalculations(
										goal.completedDays,
										goal.frequency
									);
									return (
										<GoalPieChart
											graphicColor={graphicColor}
											data={data}
											key={goal.id}
											goal={goal}
											navigation={props.navigation}
										/>
									);
								}
							})
					) : (
						<Text style={styles.noGoals}>
							You don’t have any goals set!{'\n\n'}Click the button below{'\n'}
							to create some goals and{'\n'}start achieving them.
						</Text>
					)}
					<CustomButton
						title={pieGoals.length ? 'EDIT GOALS' : 'SET GOALS'}
						style={styles.button}
						onPress={() => props.navigation.push('Set Goals')}
					/>
					{explode && (
						<ConfettiCannon
							explosionSpeed={2000}
							count={200}
							origin={{ x: -100, y: -100 }}
							// fadeOut={true}
						/>
					)}
				</ScrollView>
			</View>
		</>
	);
}

const mapState = (state) => ({
	user: state.user,
	goals: state.goals,
});

const mapDispatch = (dispatch) => ({
	getGoals: () => dispatch(getGoalsThunk()),
	getUser: () => dispatch(getUser()),
});

export default connect(mapState, mapDispatch)(HomeScreen);
