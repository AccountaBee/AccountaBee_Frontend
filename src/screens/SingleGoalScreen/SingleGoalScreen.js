import React, { useState } from 'react';
import { Text, 
         View,
         TouchableOpacity,
         } from 'react-native';
import styles from './style';
import Toast from 'react-native-toast-message'
import { completedDaysThunk } from '../../../redux/reducers/goals'
import { connect } from 'react-redux';

function SingleGoalScreen(props) {
    const goal = props.route.params.goal
    const [isCompleted, setIsCompleted] = useState(false)
    
    const toggleItem = async (goalId) =>{
        setIsCompleted(!isCompleted)
        await props.updateSingleGoalFreq(goalId)
    }
    
    Toast.show({
        text1: 'Congratulations!',
        text2: 'You completed your goal! 👋',
        position: 'bottom | top',
   })

	return (
        <View>
            <View style={styles.headcontainer}>
                <Text style={styles.headline}> {goal.title} </Text>
            </View>
            <View style={styles.container}>                
                <TouchableOpacity onPress={() => toggleItem(goal.id)}>
                    <View style = {[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}></View>
                </TouchableOpacity>
                <Text style = {[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>
                    Day 1
                </Text>
            </View>
        </View>
	);
}

const mapState = state => ({
	goals: state.goals
});

const mapDispatch = dispatch => ({
	updateSingleGoalFreq: goalId => dispatch(completedDaysThunk(goalId))
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);






