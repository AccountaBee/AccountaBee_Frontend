import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import styles from './styles';

export default class ClapBubble extends Component {
	state = {
		yPosition: new Animated.Value(0),
		opacity: new Animated.Value(0),
	};

	componentDidMount() {
		const { yPosition, opacity } = this.state;
		Animated.parallel([
			Animated.timing(yPosition, {
				toValue: -40,
				duration: 600,
				useNativeDriver: false,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}),
		]).start(() => {
			setTimeout(() => {
				this.props.animationComplete();
				this.setState({ opacity: new Animated.Value(0) });
			}, 300);
		});
	}
	render() {
		let animationStyle = {
			transform: [{ translateY: this.state.yPosition }],
			opacity: this.state.opacity,
		};
		return (
			<Animated.View
				style={
					this.props.fire
						? [styles.clapBubble, animationStyle, styles.clapBubbleOrange]
						: [styles.clapBubble, animationStyle, styles.clapBubbleGreen]
				}
			>
				<Text style={styles.clapText}>+1</Text>
			</Animated.View>
		);
	}
}
