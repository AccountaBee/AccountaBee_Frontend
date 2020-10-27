import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getRequests } from '../../../redux/reducers/requests';
import IconBadge from 'react-native-icon-badge';
import { Feather } from '@expo/vector-icons';

class FriendsIcon extends React.Component {
	componentDidMount() {
		this.props.getRequests();
	}
	render() {
		const { requests } = this.props;
		const badgeCount = requests.length;

		const color = this.props.focused ? '#9FC78A' : '#8688BC';
		return (
			<View>
				<IconBadge
					MainElement={<Feather name='users' size={20} color={color} />}
					BadgeElement={<Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>}
					IconBadgeStyle={{
						width: 15,
						height: 20,
						backgroundColor: 'red',
						left: 8,
						bottom: 20
					}}
					Hidden={badgeCount == 0}
				/>
			</View>
		);
	}
}

const mapState = state => ({
	requests: state.requests
});

const mapDispatch = dispatch => ({
	getRequests: () => dispatch(getRequests())
});

export default connect(mapState, mapDispatch)(FriendsIcon);
