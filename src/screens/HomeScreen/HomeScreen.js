import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GoalPieChart from './PieChart';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import { messageGenerator } from './MessageGenerator';
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
	const [celebration, setCelebration] = useState(false);
	const [celebratedAlready, setCelebratedAlready] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [pieGoals, setPieGoals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			await props.getGoals();
			await props.getUser();
		}
		fetchData();
		setLoaded(true);
	}, []);

	useEffect(() => {
		setPieGoals(props.goals);
	}, [props.goals]);

	useFocusEffect(
		React.useCallback(() => {
			if (
				props.goals.length &&
				props.goals.every((goal) => goal.completedDays >= goal.frequency) &&
				!celebration
			) {
				setCelebration(true);
			}
		}, [props.goals])
	);

	if (!loaded) {
		return null;
	} else {
		return (
			<>
				<View style={styles.container}>
					<Text style={styles.headline}>My Goals</Text>
				</View>
				<View>
					<ScrollView>
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
								You don’t have any goals set!{'\n\n'}Click the button below
								{'\n'}
								to create some goals and{'\n'}start achieving them.
							</Text>
						)}
						<CustomButton
							title={pieGoals.length ? 'EDIT GOALS' : 'SET GOALS'}
							style={styles.button}
							onPress={() => props.navigation.push('Set Goals')}
						/>
						<View style={styles.fullScreen} />
						{celebration && !celebratedAlready && (
							<>
								<ConfettiCannon
									explosionSpeed={2000}
									count={300}
									origin={{ x: -100, y: -100 }}
									fadeOut={true}
								/>
								<View style={styles.centeredView}>
									<Modal transparent={true}>
										<View style={styles.centeredView}>
											<View style={styles.modalView}>
												<Text style={styles.modalText}>
													{messageGenerator()}
												</Text>
												<TouchableHighlight>
													<AntDesign
														name="closecircleo"
														size={24}
														color="#8688BC"
														style={styles.xbutton}
														onPress={() => setCelebratedAlready(true)}
													/>
												</TouchableHighlight>
											</View>
										</View>
									</Modal>
								</View>
							</>
						)}
					</ScrollView>
				</View>
			</>
		);
	}
}

const mapState = (state) => ({
	goals: state.goals,
});

const mapDispatch = (dispatch) => ({
	getGoals: () => dispatch(getGoalsThunk()),
	getUser: () => dispatch(getUser()),
});

export default connect(mapState, mapDispatch)(HomeScreen);
