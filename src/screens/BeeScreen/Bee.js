import React, { Component } from 'react';
import { View, Text, Animated, Image, Easing } from 'react-native';
import styles from './styles';

class Bee extends Component {
	state = {
		LogoAnime: new Animated.Value(0),
		LogoText: new Animated.Value(0)
	};

	// componentDidMount(){
	//     const {LogoAnime, LogoText} = this.state
	//     Animated.parallel([
	//         Animated.spring(LogoAnime, {
	//             delay: 100,
	//             toValue: 1,
	//             tension: 500,
	//             friction: 2,
	//             duration: 40000,
	//             easing: Easing.bounce,

	//             useNativeDriver:false
	//         }).start(),

	//         Animated.timing(LogoText, {
	//             toValue: 1,
	//             duration: 2000,
	//             useNativeDriver: true
	//         })
	//     ]).start()
	// }

	componentDidMount() {
		const { LogoAnime, LogoText } = this.state;
		Animated.parallel([
			Animated.spring(LogoAnime, {
				delay: 100,
				toValue: 1,
				tension: 10,
				friction: 1,
				duration: 90000,
				easing: Easing.bounce,

				useNativeDriver: false
			}).start(),

			Animated.timing(LogoText, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true
			})
		]).start();
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View
					style={{
						opacity: this.state.LogoAnime,
						top: this.state.LogoAnime.interpolate({
							inputRange: [2, 3],
							outputRange: [80, 0]
						})
					}}>
					<Image source={require('../../../assets/beeLogin.png')} style={styles.bee} />
				</Animated.View>

				<Animated.View style={{ opacity: this.state.LogoText }}>
					<Text style={styles.header}>ACCOUNTABEE</Text>
				</Animated.View>
			</View>
		);
	}
}

export default Bee;
