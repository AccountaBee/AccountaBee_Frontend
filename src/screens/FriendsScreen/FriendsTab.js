import React from "react";
import { View, Text } from "react-native";
import { render } from "react-dom";
import { connect } from "react-redux";
import { getRequests } from "../../../redux/reducers/requests";

class FriendsTab extends React.Component {
	render() {
		const { requests } = this.props;
		const badgeCount = requests.length;
		return (
			<View>
				<View
					style={{
						backgroundColor: "red",
						padding: 3

						// width: 12,
						// height: 12,
					}}>
					<Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{badgeCount}</Text>
					{/* <Text>{badgeCount}</Text> */}
				</View>
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

export default connect(mapState, mapDispatch)(FriendsTab);
