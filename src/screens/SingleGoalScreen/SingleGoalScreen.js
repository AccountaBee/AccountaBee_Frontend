import React, { useState } from 'react';
import { Text, 
         View,
         TouchableOpacity,
         Dimensions,
        
         } from 'react-native';
import { useSession } from '../../context';
import { firebase } from '../../firebase/config';
import styles from './style';


export default function SingleGoalScreen(props) {
    const user = useSession();

    const [isCompleted, setIsCompleted] = useState(false)

    const toggleItem = () =>{
        setIsCompleted(!isCompleted)
    }
  
	return (

        <View>
            <View style={styles.headcontainer}>
                <Text style={styles.headline}> 1. Meditate {user.goal} </Text>
            </View>

            <View style={styles.container}>                
                <TouchableOpacity onPress={toggleItem}>
                    <View style = {[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}></View>
                </TouchableOpacity>

                <Text style = {[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>
                    Day 1
                </Text>

            </View>

        </View>
       
	);
}
