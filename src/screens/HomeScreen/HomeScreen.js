import React, { useEffect } from "react";
import { Text, View } from "react-native";
import GoalPieChart from "./PieChart";
import { connect } from "react-redux";
import { getGoalsThunk, resetGoalsThunk } from "../../../redux/reducers/goals";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { getUser } from "../../../redux/reducers/users";

const pieCalculations = (completedDays, frequency) => {
	const pieData = [],
		graphicColor = [];
	let colorComplete = completedDays;
	for (let i = 1; i <= frequency; i++) {
		let objStr = { x: i, y: 1 };
		pieData.push(objStr);
		if (colorComplete) {
			graphicColor.push("#8688BC");
			colorComplete--;
		} else {
			graphicColor.push("#DCDCDC");
		}
	}
	return [pieData, graphicColor];
}

function HomeScreen(props) {
	useEffect(() => {
		async function fetchData() {
			await props.getGoals();
      await props.getUser();
		}
    fetchData();
  }, []);
  
  useEffect(() => {
    if (props.user.uid) {
      async function reset(uid) {
        const date = new Date();
        const dayOfWeek = date.getDay();
        const hourOfDay = date.getHours()
        const minOfDay = date.getMinutes()
      // if (dayOfWeek === 1 & hourOfDay === 1) {
        if (minOfDay === 4) {
          console.log('HOLAAAAAAAA! UID', uid)
          await props.resetGoals(uid)
        }
      }
      reset(props.user.uid);
    }
  }, [props.user.uid])

  
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
			<View>
				<ScrollView>
					{props.goals.length ? (
						props.goals.map(goal => {
							
								const [data, graphicColor] = pieCalculations(goal.completedDays, goal.frequency);
								return (
									<GoalPieChart
										graphicColor={graphicColor}
										data={data}
										key={goal.id}
										goal={goal}
										navigation={props.navigation}
									/>
								);
							
						})
					) : (
						<Text style={styles.noGoals}>
							You don’t have any goals set!{"\n\n"}Head over to Settings{"\n"}to create some goals
							and{"\n"}start achieving them.
						</Text>
					)}
				</ScrollView>
			</View>
		</>
	);
}

const mapState = state => ({
	user: state.user,
	goals: state.goals
});

const mapDispatch = dispatch => ({
	getGoals: () => dispatch(getGoalsThunk()),
  getUser: () => dispatch(getUser()),
  resetGoals: (uid) => dispatch(resetGoalsThunk(uid))
});

export default connect(mapState, mapDispatch)(HomeScreen);
