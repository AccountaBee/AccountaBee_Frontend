import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import styles from './style';
import Toast from 'react-native-toast-message';
import { completedDaysThunk } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';

function SingleGoalScreen(props) {
	const goal = props.goal;
	const [isCompleted, setIsCompleted] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const incrementDay = async (goalId) => {
		if (goal.completedDays > goal.frequency - 1) {
			return;
		}
		if (goal.completedDays < goal.frequency - 1) {
			setIsCompleted(!isCompleted);
			await props.updateSingleGoalFreq(goalId);
			Toast.show({
				text1: 'Congratulations!',
				text2: 'You are one step closer! 👋',
				tpye: 'success',
				position: 'bottom | top',
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
				visibilityTime: 1000,
			});
		}
		if (goal.completedDays === goal.frequency - 1) {
			setIsCompleted(!isCompleted);
			await props.updateSingleGoalFreq(goalId);
			setModalVisible(!modalVisible);
		}
	};

	const arrayDays = [];

	for (let i = 1; i <= goal.frequency; i++) {
		arrayDays.push(i);
	}

	const backToGoals = () => {
		props.navigation.navigate('Home');
		setModalVisible(!modalVisible);
	};

	const viewPost = () => {
		props.navigation.navigate('Feed');
		setModalVisible(!modalVisible);
	};

	return (
		<View>
			<View style={styles.headcontainer}>
				<Text style={styles.headline}> {goal.title} </Text>
			</View>

			{arrayDays.map((day, idx) => (
				<View style={styles.container} key={idx}>
					<TouchableOpacity
						onPress={() =>
							day === goal.completedDays + 1 && incrementDay(goal.id)
						}
					>
						<View style={styles.day}>
							<View
								style={[
									styles.circle,
									goal.completedDays >= day
										? styles.completeCircle
										: styles.incompleteCircle,
								]}
							></View>
							<Text
								style={[
									styles.text,
									goal.completedDays >= day
										? styles.strikeText
										: styles.unstrikeText,
								]}
							>
								Day {day}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			))}

			<View>
				<Modal animationType="slide" transparent={true} visible={modalVisible}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>
								Congratulations,{'\n'} you made it!
							</Text>
							<Text style={styles.modalInnerText}>
								You completed your goal "{goal.title}"!
							</Text>
							<View style={styles.buttonContainer}>
								<CustomButton
									style={styles.nextButton}
									title="VIEW POST"
									onPress={() => viewPost()}
								/>
								<CustomButton
									style={styles.nextButton}
									title="BACK TO GOALS"
									onPress={() => backToGoals()}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
}

const mapState = (state, props) => ({
	goal: state.goals.find((goal) => goal.id === props.route.params.goal.id),
});

const mapDispatch = (dispatch) => ({
	updateSingleGoalFreq: (goalId) => dispatch(completedDaysThunk(goalId)),
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);
