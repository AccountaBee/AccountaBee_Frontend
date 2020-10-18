import React from 'react';
import { Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pieStyle } from './styles';

const data = [
	{ x: 1, y: 62.5 },
	{ x: 2, y: 37.5 },
];
const graphicColor = ['#8688BC', '#DCDCDC'];

export default function GoalPieChart(props) {
	return (
		<TouchableOpacity>
			<Text>1. Meditate</Text>
			<VictoryPie
				style={pieStyle.pie}
				data={data}
				width={225}
				height={225}
				cornerRadius={5}
				colorScale={graphicColor}
				innerRadius={45}
				labels={() => null}
			/>
		</TouchableOpacity>
	);
}
