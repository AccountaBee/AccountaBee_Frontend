import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import { Feather } from '@expo/vector-icons';
import { getUnseenLikes } from '../../../redux/reducers/unseenLikes';

class FeedIcon extends React.Component {
	componentDidMount() {
		this.props.getUnseenLikes();
	}
	render() {
		const { unseenLikes } = this.props || [];
		const badgeCount = unseenLikes.length;

		const color = this.props.focused ? '#9FC78A' : '#8688BC';
		return (
			<View>
				<IconBadge
					MainElement={
						<Feather name="message-square" size={20} color={color} />
					}
					BadgeElement={<Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>}
					IconBadgeStyle={{
						width: 15,
						height: 20,
						backgroundColor: 'red',
						left: 8,
						bottom: 20,
					}}
					Hidden={badgeCount == 0}
				/>
			</View>
		);
	}
}

const mapState = (state) => ({
	unseenLikes: state.unseenLikes,
});

const mapDispatch = (dispatch) => ({
	getUnseenLikes: () => dispatch(getUnseenLikes()),
});

export default connect(mapState, mapDispatch)(FeedIcon);
