import React from "react";

import { Text, View, Button } from "react-native";

import { connect } from "react-redux";
import { getUnseenLikes } from "../../../redux/reducers/likes";
import { getPosts } from "../../../redux/reducers/posts";
import { likePost } from "../../../redux/reducers/singlePost";

class FeedScreen extends React.Component {
	// get all feed posts when component mounts
	componentDidMount() {
		this.props.getPosts();
		this.props.getUnseenLikes();
	}

	onLikePress = postId => {
		this.props.likePost(postId);
	};

	stringifyLike = post => {
		if (post.likes.length === 1) {
			let text = `${post.likes[0].user.firstName} cheered you on for completing ${
				post.completedDays
			} ${post.completedDays === 1 ? "day" : "days"} of ${post.title}`;
			return { id: post.id, text: text };
		} else if (post.likes.length === 2) {
			let text = `${post.likes[0].user.firstName} and ${
				post.likes[1].user.firstName
			} cheered you on for completing ${post.completedDays} ${
				post.completedDays === 1 ? "day" : "days"
			} of ${post.title}`;
			return { id: post.id, text: text };
		} else {
			let text = `${post.likes[0].user.firstName} and &${post.likes[1].user.firstName} and ${
				post.likes.length - 2
			} other ${post.likes.length - 2 === 1 ? "friend" : "friends"} cheered you on for completing ${
				post.completedDays
			} ${post.completedDays === 1 ? "day" : "days"} of ${post.title}`;
			return { id: post.id, text: text };
		}
	};
	render() {
		const posts = this.props.posts || [];
		const likes = this.props.likes || [];

		console.log("LIKES!!!", likes);
		return (
			<View>
				<Text>Feed Screen</Text>
				{posts.map(post => (
					<View key={post.id}>
						<Text>{`${post.user.firstName} has completed ${post.completedDays} days of their ${post.title} goal!`}</Text>
						<Text>{post.likes.length}</Text>
						<Button onPress={() => this.onLikePress(post.id)} title="Clap"></Button>
					</View>
				))}
				<Text>Notifications</Text>
				{likes.map(post => {
					let object = this.stringifyLike(post);
					return <Text key={object.id}>{object.text}</Text>;
				})}
			</View>
		);
	}
}

const mapState = state => {
	return {
		posts: state.posts,
		likes: state.likes
	};
};

const mapDispatch = dispatch => ({
	getPosts: () => dispatch(getPosts()),
	likePost: postId => dispatch(likePost(postId)),
	getUnseenLikes: () => dispatch(getUnseenLikes())
});

export default connect(mapState, mapDispatch)(FeedScreen);
