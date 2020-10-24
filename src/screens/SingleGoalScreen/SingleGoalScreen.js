import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import styles from './style';
import Toast from 'react-native-toast-message';
import { completedDaysThunk } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import { newPost } from '../../../redux/reducers/posts';
import { ScrollView } from 'react-native-gesture-handler';
import { toastGeneratorTextOne, toastGeneratorTextTwo } from './ToastGenerator';

function SingleGoalScreen(props) {
	const goal = props.goal || {};
	const [isCompleted, setIsCompleted] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const incrementDay = async goalId => {
		if (goal.completedDays > goal.frequency - 1) {
			return;
		} else if (goal.completedDays < goal.frequency - 1) {
			setIsCompleted(!isCompleted);
      await props.updateSingleGoalFreq(goalId);
			Toast.show({
				text1: `${toastGeneratorTextOne()}`,
				text2: `${toastGeneratorTextTwo()} 👋,`,
				type: 'success',
				position: 'bottom | top',
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
				visibilityTime: 1000
			});
			props.newPost(goal.title, goal.completedDays + 1, false);
		}

		if (goal.completedDays === goal.frequency - 1) {
			setIsCompleted(!isCompleted);
			await props.updateSingleGoalFreq(goalId);
			setModalVisible(!modalVisible);
			props.newPost(goal.title, goal.completedDays + 1, true);
		}
	};

	const getStatusStyles = day => {
		if (goal.completedDays === day - 1) {
			return [styles.activeCircle, styles.activeText];
		} else if (goal.completedDays > day - 1) {
			return [styles.completeCircle, styles.completeText];
		} else {
			return [styles.incompleteCircle, styles.incompleteText];
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
			<View>
				<ScrollView>
					{arrayDays.map((day, idx) => {
						const statusStyles = getStatusStyles(day);

						return (
							<View style={styles.container} key={idx}>
								<TouchableOpacity
									onPress={() =>
										day === goal.completedDays + 1 ? incrementDay(goal.id) : <View></View>
									}>
									<View style={styles.day}>
										<View style={[styles.circle, statusStyles[0]]}></View>
										<Text style={[styles.text, statusStyles[1]]}>Day {day}</Text>
									</View>
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>
			</View>
			<View>
				<Modal animationType='slide' transparent={true} visible={modalVisible}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Congratulations,{'\n'}you made it!</Text>
							<Text style={styles.modalInnerText}>You completed your goal "{goal.title}"!</Text>
							<View style={styles.buttonContainer}>
								<CustomButton
									style={styles.nextButton}
									title='VIEW POST IN FEED'
									onPress={() => viewPost()}
								/>
								<CustomButton
									style={styles.nextButton}
									title='BACK TO GOALS'
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
	goal: state.goals.find(goal => goal.id === props.route.params.goal.id)
});

const mapDispatch = dispatch => ({
	updateSingleGoalFreq: goalId => dispatch(completedDaysThunk(goalId)),
	newPost: (title, completedDays, targetDaysMet) =>
		dispatch(newPost(title, completedDays, targetDaysMet))
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);
