import React, { useState } from 'react';
import {
	Text,
	View,
	Modal,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';
import styles from './style';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { completedDaysThunk } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';

function SingleGoalScreen(props) {
	const goal = props.goal;
	const [isCompleted, setIsCompleted] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const incrementDay = async (goalId) => {
		setIsCompleted(!isCompleted);
		await props.updateSingleGoalFreq(goalId);

		if (goal.completedDays < goal.frequency - 1) {
			Toast.show({
				text1: 'Congratulations!',
				text2: 'You are one step closer! 👋',
				tpye: 'success',
				position: 'bottom | top',
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}

		if (goal.completedDays === goal.frequency) {
			setModalVisible(!modalVisible);
		}
	};

	const arrayDays = [];

	for (let i = 1; i <= goal.frequency; i++) {
		arrayDays.push(i);
	}

	const backToGoals = () => {
		props.navigation.navigate('Home');
	};

	const viewPost = () => {
		props.navigation.navigate('Feed');
	};

	return (
		<View>
			<View style={styles.headcontainer}>
				<Text style={styles.headline}> {goal.title} </Text>
			</View>

			{arrayDays.map((day, idx) => (
				<View style={styles.container} key={idx}>
					<TouchableOpacity onPress={() => incrementDay(goal.id)}>
						<View style={styles.day}>
							<View
								style={[
									styles.circle,
									goal.completedDays >= day
										? styles.completeCircle
										: styles.incompleteCircle,
								]}
							/>
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
							<TouchableHighlight>
								<AntDesign
									name="closecircleo"
									size={24}
									color="white"
									style={styles.xbutton}
									onPress={() => {
										setModalVisible(!modalVisible);
									}}
								/>
							</TouchableHighlight>
							<Text style={styles.modalText}>
								Congratulations,{'\n'} You made it!
							</Text>
							<Text style={styles.modalInnerText}>
								You completed your goal "{goal.title}"!
							</Text>
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
				</Modal>
			</View>
		</View>
	);
}

const mapState = (state, props) => {
	return {
		goal: state.goals.find((goal) => goal.id === props.route.params.goal.id),
	};
};

const mapDispatch = (dispatch) => ({
	updateSingleGoalFreq: (goalId) => dispatch(completedDaysThunk(goalId)),
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);
