import React, { Component } from 'react';
import { Text, Animated} from 'react-native';
import styles from './styles';

export default class ClapBubble extends Component{
    constructor(){
        super()
        this.state={
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -70,
                duration: 600,
                useNativeDriver:false
            }),
            Animated.timing(this.state.opacity,{
                toValue: 1,
                duration: 500,
                useNativeDriver:false
            })
        ]).start(()=>{
            setTimeout(()=>{
                this.props.animationComplete()
                this.setState({opacity: new Animated.Value(0)})
            }, 300)
        })
    }
    render(){
        let animationStyle = {
            transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity
        }
        return(
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+1</Text>
            </Animated.View>
        )
    }
}