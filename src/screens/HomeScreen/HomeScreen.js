import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import GoalPieChart from './PieChart';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import { getGoalsThunk, resetGoalsThunk } from '../../../redux/reducers/goals';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getUser } from '../../../redux/reducers/users';
import { useFocusEffect } from '@react-navigation/native';

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
}

function HomeScreen(props) {
	const [pieGoals, setPieGoals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			await props.getGoals();
      await props.getUser();
		}
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (props.user && props.user.uid) {
        async function reset(uid) {
          let now = new Date();
          let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
          const lastTimeUpdated = props.goals.map(goal => new Date(goal.updatedAt))
          //change variable 'now' to 'lastSunday' after demo
          const oldGoalsCheck = lastTimeUpdated.some(time => time < lastSunday)
          if (oldGoalsCheck) {
            await props.resetGoals(uid)
          }
        }
        reset(props.user.uid);
      }
    }, [props.user.uid]))

	useEffect(() => {
		setPieGoals(props.goals);
	}, [props.goals]);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
			<View>
				<ScrollView>
					{props.goals.length ? (
						props.goals.map((goal) => {
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
  resetGoals: (uid) => dispatch(resetGoalsThunk(uid))
});

export default connect(mapState, mapDispatch)(HomeScreen);
