import React, { useEffect } from "react";
import { Text, View } from "react-native";
import GoalPieChart from "./PieChart";
import { connect } from "react-redux";
import { getGoalsThunk } from "../../../redux/reducers/goals";
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
};

function HomeScreen(props) {
	useEffect(() => {
		async function fetchData() {
			await props.getGoals();
			await props.getUser();
		}
		fetchData();
	}, []);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.headline}>My Goals</Text>
			</View>
			<View>
				<ScrollView>
					{props.goals.length ? (
						props.goals.map(goal => {
							if (goal.status === "active") {
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
							}
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
	getUser: () => dispatch(getUser())
});

export default connect(mapState, mapDispatch)(HomeScreen);
