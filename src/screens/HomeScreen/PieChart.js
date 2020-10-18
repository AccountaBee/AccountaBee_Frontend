import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pieStyle } from './styles';

const data = [
	{ x: 1, y: 62.5 },
	{ x: 2, y: 37.5 },
];
const graphicColor = ['#8688BC', '#DCDCDC'];

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
				style={pieStyle.pie}
				data={data}
				width={175}
				height={175}
				cornerRadius={5}
				colorScale={graphicColor}
				innerRadius={28}
				labels={() => null}
			/>
		</TouchableOpacity>
	);
}
