import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUnseenLikes, updateLikesToSeen } from '../../../redux/reducers/likes';
import { getPosts } from '../../../redux/reducers/posts';
import { likePost } from '../../../redux/reducers/singlePost';

// TODO - make notification icon
// only send a limited number of posts

class FeedScreen extends React.Component {
	componentDidMount() {
		this.props.getPosts();
		this.props.getUnseenLikes();
		// need to connect unseen likes to modal to display as notifications
	}

	onLikePress = postId => {
		this.props.likePost(postId);
	};

	stringifyNotification = post => {
		const baseText = `cheered you on for completing ${post.completedDays} ${
			post.completedDays === 1 ? 'day' : 'days'
		} of ${post.title}`;
		let text;
		if (post.likes.length === 1) {
			text = `${post.likes[0].user.firstName} ${baseText}`;
		} else if (post.likes.length === 2) {
			text = `${post.likes[0].user.firstName} and ${post.likes[1].user.firstName} ${baseText}`;
		} else {
			text = `${post.likes[0].user.firstName} and &${post.likes[1].user.firstName} and ${
				post.likes.length - 2
			} other ${post.likes.length - 2 === 1 ? 'friend' : 'friends'} ${baseText}`;
		}
		return { id: post.id, text: text };
	};
	render() {
		const posts = this.props.posts || [];
		const unseenLikes = this.props.likes || [];

		posts.sort((a, b) => b.id - a.id);

		return (
			// need to add scrolling or paginaton or something
			<View>
				<ScrollView>
					<Text>Feed Screen</Text>
					{posts.map(post => {
						let { completedDays, title, targetDaysMet } = post;
						let { firstName } = post.user;
						return (
							<View key={post.id}>
								{/* we can change up the wording later! */}
								<Text>{`${firstName} has completed ${targetDaysMet ? 'ALL' : ''} ${completedDays} ${
									completedDays === 1 ? 'day' : 'days'
								} of their ${title} goal!`}</Text>
								<Text>{post.likes.length}</Text>
								<Button onPress={() => this.onLikePress(post.id)} title='Clap'></Button>
							</View>
						);
					})}
					{/* THIS WILL BE IN THE MODAL */}
					<Text>Notifications</Text>
					{unseenLikes.map(post => {
						let object = this.stringifyNotification(post);
						return <Text key={object.id}>{object.text}</Text>;
					})}
					<Button
						title='close notifications'
						onPress={() => this.props.updateLikesToSeen(unseenLikes)}></Button>
				</ScrollView>
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
	getUnseenLikes: () => dispatch(getUnseenLikes()),
	updateLikesToSeen: unseenLikes => dispatch(updateLikesToSeen(unseenLikes))
});

export default connect(mapState, mapDispatch)(FeedScreen);
