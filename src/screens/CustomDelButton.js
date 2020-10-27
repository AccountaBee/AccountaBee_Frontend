import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDelButton = props => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<MaterialCommunityIcons name='delete-outline' size={26} color='#424347' />
		</TouchableOpacity>
	);
};

export default CustomDelButton;
