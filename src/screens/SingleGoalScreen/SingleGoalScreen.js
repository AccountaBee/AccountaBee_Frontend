import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSession } from '../../context';
import styles from './style';
import Toast from 'react-native-toast-message';
import { completedDaysThunk } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';

function SingleGoalScreen(props) {
	console.log('route params: ', props.route.params);
	const user = useSession();
	const [isCompleted, setIsCompleted] = useState(false);
	const toggleItem = () => {
		setIsCompleted(!isCompleted);
		updateSingleGoalFreq('1');
	};
	Toast.show({
		text1: 'Congratulations!',
		text2: 'You completed your goal! 👋',
		position: 'bottom | top',
	});
	//props.navigation.route.params should be an object with goal as key and title of goal as value
	//in navigation.navigate
	return (
		<View>
			<View style={styles.headcontainer}>
				<Text style={styles.headline}> {`${props.goals[0]}`} </Text>
			</View>
			<View style={styles.container}>
				<TouchableOpacity onPress={toggleItem}>
					<View
						style={[
							styles.circle,
							isCompleted ? styles.completeCircle : styles.incompleteCircle,
						]}
					></View>
				</TouchableOpacity>
				<Text
					style={[
						styles.text,
						isCompleted ? styles.strikeText : styles.unstrikeText,
					]}
				>
					Day 1
				</Text>
			</View>
		</View>
	);
}

const mapState = (state) => ({
	goals: state.goals,
});

const mapDispatch = (dispatch) => ({
	updateSingleGoalFreq: (goalId) => dispatch(completedDaysThunk(goalId)),
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);
