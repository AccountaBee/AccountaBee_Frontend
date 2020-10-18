import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pieStyle } from './styles';

export default function GoalPieChart(props) {
	const { completedDays, frequency, title } = props.goal;

	return (
		<TouchableOpacity
			style={pieStyle.container}
			onPress={() =>
				props.navigation.navigate('Single Goal', { goal: props.goal })
			}
		>
			<View style={pieStyle.textContainer}>
				<Text style={pieStyle.goalName}>{title}</Text>
				<Text style={pieStyle.subhead}>
					{completedDays} out of {frequency} days completed
				</Text>
			</View>
			<VictoryPie
				padAngle={4}
				style={pieStyle.pie}
				data={props.data}
				width={175}
				height={175}
				colorScale={props.graphicColor}
				innerRadius={28}
				labels={() => null}
			/>
		</TouchableOpacity>
	);
}
