import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import GoalPieChart from './PieChart';
import { connect } from 'react-redux';
import { getGoalsThunk } from '../../../redux/reducers/goals';
import styles from './styles';

function HomeScreen(props) {
	const [allGoals, setGoals] = useState('');

	// useEffect(() => {
	// 	async function fetchData() {
	// 		// if (props.goals) {
	// 		// 	setGoals(props.goals);
	// 		// 	console.log('allGoals from redux: ', allGoals);
	// 		// } else {
	// 		await props.getGoals();
	// 		setGoals(props.goals);
	// 		console.log('allGoals from redux thunk: ', allGoals);
	// 		// }
	// 	}
	// 	fetchData();
	// }, []);

	return (
		<>
			<View style={stylesx.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
			<View>
				<GoalPieChart />
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
});

export default connect(mapState, mapDispatch)(HomeScreen);
