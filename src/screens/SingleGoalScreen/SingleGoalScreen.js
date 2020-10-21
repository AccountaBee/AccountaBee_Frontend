import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from './style';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { completedDaysThunk } from '../../../redux/reducers/goals';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';

function SingleGoalScreen(props) {
  const goal = props.goal
  const [isCompleted, setIsCompleted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const incrementDay = async (goalId) => {
    if (goal.completedDays > goal.frequency - 1 ) {
      //do nothing
    }
    // onPress={() => incrementDay(goal.id, day)}
    else if (goal.completedDays < goal.frequency - 1 ) {
      setIsCompleted(!isCompleted)
      await props.updateSingleGoalFreq(goalId)
      Toast.show({
        text1: 'Congratulations!',
        text2: 'You are one step closer ! 👋',
        tpye:'success',
        position: 'bottom | top',
        autoHide : true,
        topOffset:30,
        bottomOffset : 40,
        })
    }

    if (goal.completedDays === goal.frequency - 1 ) {
      setIsCompleted(!isCompleted)
      await props.updateSingleGoalFreq(goalId)
      setModalVisible(!modalVisible)
    }
  }

  const getStatusStyles = (day) => {
    if (goal.completedDays === day - 1) {
      return [styles.activeCircle, styles.activeText]
    } else if (goal.completedDays > day - 1) {
      return [styles.completeCircle, styles.completeText]
    } else {
      return [styles.incompleteCircle, styles.incompleteText]
    }
  }

const arrayDays = []

for (let i = 1; i <= goal.frequency; i++) {
  arrayDays.push(i)               
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
  {arrayDays.map((day, idx) => {
    const statusStyles = getStatusStyles(day)

    return (
      <View style={styles.container} key={idx}>
        <TouchableOpacity onPress={() => day === goal.completedDays+1? (incrementDay(goal.id)):(<View></View>)} >
          <View style={styles.day}> 
          <View style = {[styles.circle, statusStyles[0]]}></View>
            <Text style = {[styles.text, statusStyles[1]]}>
            Day {day}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  })}
  <View>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      >
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
                }} /
              >
            </TouchableHighlight>
            <Text style={styles.modalText}>Congratulations,{'\n'} You made it !</Text>
            <Text style={styles.modalInnerText}>You completed your goal "{goal.title}" !</Text>
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
  )
}

const mapState = (state, props) => {
  return ({
    goal:  state.goals.find(goal => goal.id === props.route.params.goal.id)
  })
};

const mapDispatch = dispatch => ({
	updateSingleGoalFreq: (goalId) => dispatch(completedDaysThunk(goalId))
});

export default connect(mapState, mapDispatch)(SingleGoalScreen);
