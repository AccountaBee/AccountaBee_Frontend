import React from 'react';
import * as Svg from 'react-native-svg';
import { View, Text } from 'react-native';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory-native';

const data = [
	{ x: 1, y: 62.5 },
	{ x: 2, y: 37.5 },
];
const graphicColor = ['#8688BC', '#DCDCDC', '#badfe7'];

export default function GoalPieChart(props) {
	return (
		<View>
			<Text>1. Meditate</Text>
			<VictoryLabel
				text="0% Accompished"
				x={30}
				y={20}
				style={{ fontSize: 6, fontWeight: 500 }}
			/>
			<VictoryPie
				data={data}
				width={250}
				height={250}
				cornerRadius={5}
				colorScale={graphicColor}
				innerRadius={50}
				labels={() => null}
			/>
		</View>
	);
}

// const CompletedProjects = (props) => {
// 	return (
// 		<Svg viewBox="0 0 150 125" width="100%" height="100%">
// 			<VictoryLabel
// 				text="0% Accompished"
// 				x={30}
// 				y={20}
// 				style={{ fontSize: 6, fontWeight: 500 }}
// 			/>
// 			<VictoryPie
// 				standalone={false}
// 				animate={{ duration: 1000 }}
// 				width={150}
// 				height={150}
// 				data={props.data}
// 				innerRadius={32}
// 				cornerRadius={25}
// 				labels={() => null}
// 				style={{
// 					data: {
// 						fill: ({ datum }) => {
// 							const color = datum.y > 30 ? 'green' : 'red';
// 							return datum.x === 1 ? color : 'transparent';
// 						},
// 					},
// 				}}
// 			/>
// 			<VictoryAnimation duration={1500} data={props}>
// 				{(newProps) => {
// 					return (
// 						<VictoryLabel
// 							textAnchor="middle"
// 							verticalAnchor="middle"
// 							x={75}
// 							y={75}
// 							text={`${Math.round(newProps.completed)}%`}
// 							style={{ fontSize: 10 }}
// 						/>
// 					);
// 				}}
// 			</VictoryAnimation>
// 		</Svg>
// 	);
// };

// export default CompletedProjects;
