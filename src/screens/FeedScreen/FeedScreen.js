/* eslint-disable complexity */
import React, { Component } from 'react';
import { Text, View, Modal, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { AntDesign } from '@expo/vector-icons';
import { getUnseenLikes, updateLikesToSeen } from '../../../redux/reducers/unseenLikes';
import { getPosts, likePost, unlikePost } from '../../../redux/reducers/posts';
import { firebase } from '../../firebase/config';
import ClapBubble from './ClapBubble';
import styles from './styles';

class FeedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			clapsVisible: false
		};
	}

	componentDidMount() {
		this.props.getPosts();
		this.props.getUnseenLikes();
		if (this.props.unseenLikes.length > 0) {
			this.setState({ modalVisible: true });
		}
	}

	animationComplete = () => {
		this.setState({ clapsVisible: false });
	};

	renderClaps = (fireBoolean = false) => {
		return <ClapBubble animationComplete={this.animationComplete} fire={fireBoolean} />;
	};

	onLikePress = (post, myLike) => {
		if (myLike.length) {
			this.props.unlikePost(post.id);
		} else {
			this.props.likePost(post.id);
		}
	};

	onCloseModal = unseenLikes => {
		this.setState({ modalVisible: false });
		this.props.updateLikesToSeen(unseenLikes);
	};

	stringifyNotification = post => {
		let text, baseText;
		if (!post.completedDays) {
			baseText = `cheered you on for setting the goal of ${post.title}`;
		} else {
			baseText = `applauded you for completing ${post.completedDays} ${
				post.completedDays === 1 ? 'day' : 'days'
			} of ${post.title}`;
		}

		switch (post.likes.length) {
			case 1: {
				text = `${post.likes[0].user.firstName} ${baseText}`;
				break;
			}
			case 2: {
				text = `${post.likes[0].user.firstName} and ${post.likes[1].user.firstName} ${baseText}`;
				break;
			}
			default: {
				text = `${post.likes[0].user.firstName} and &${post.likes[1].user.firstName} and ${
					post.likes.length - 2
				} other ${post.likes.length - 2 === 1 ? 'friend' : 'friends'} ${baseText}`;
			}
		}
		return { id: post.id, text: text };
	};

	renderPost = post => {
		const { completedDays, title, targetDaysMet, createdAt } = post;
		const { firstName, profilePicture } = post.user;
		const currentUid = firebase.auth().currentUser.uid;

		const isGoalSettingPost = post.completedDays === 0;

		let postText;

		if (isGoalSettingPost) {
			postText = `${firstName} set a goal to complete ${post.frequency || 3} ${
				post.frequency === 1 ? 'day' : 'days'
			} of ${title} this week!`;
		} else {
			postText = `${firstName} has completed${targetDaysMet ? ' ALL' : ''} ${completedDays} ${
				completedDays === 1 ? 'day' : 'days'
			} of their ${title} goal!`;
		}

		let myLike = post.likes.filter(like => like.userUid === currentUid);

		const likeWord = isGoalSettingPost ? 'Cheer' : 'Clap';
		const iconText =
			post.likes.length === 1
				? `${post.likes.length} ${likeWord}`
				: `${post.likes.length} ${likeWord}s`;

		return (
			<View style={styles.feedItem} key={post.id}>
				{profilePicture ? (
					<Image source={{ uri: profilePicture }} style={styles.userImage} />
				) : (
					<Image source={require('../../../assets/blank-profile.png')} style={styles.userImage} />
				)}
				<View style={{ flex: 1 }}>
					<View style={styles.feedContent}>
						<View>
							<Text style={styles.userName}>{firstName}</Text>
							<View>
								<TimeAgo time={createdAt} />
							</View>
						</View>
					</View>

					<Text style={styles.post}>{postText}</Text>
					{isGoalSettingPost ? (
						<View style={{ flexDirection: 'row' }}>
							{myLike.length ? (
								<>
									<Text style={styles.clapNumber}>{iconText}</Text>
									<TouchableOpacity
										activeOpacity={0.7}
										style={styles.clapButton}
										onPress={() => this.onLikePress(post, myLike)}>
										<Image
											source={require('../../../assets/firecolors.png')}
											style={styles.clapImage}
											title='ClapImage'
										/>
									</TouchableOpacity>
									{this.renderClaps(true)}
								</>
							) : (
								<>
									<Text style={styles.clapNumber}>{iconText}</Text>
									<TouchableOpacity
										activeOpacity={0.7}
										style={styles.clapButton}
										onPress={() => this.onLikePress(post, myLike)}>
										<Image
											source={require('../../../assets/fire.png')}
											style={styles.clapImage}
											title='ClapImage'
										/>
									</TouchableOpacity>
								</>
							)}
						</View>
					) : (
						<View style={{ flexDirection: 'row' }}>
							{myLike.length ? (
								<>
									<Text style={styles.clapNumber}>{iconText}</Text>
									<TouchableOpacity
										activeOpacity={0.7}
										style={styles.clapButton}
										onPress={() => this.onLikePress(post, myLike)}>
										<Image
											source={require('../../../assets/hand-clap-green.png')}
											style={styles.clapImage}
											title='ClapImage'
										/>
									</TouchableOpacity>
									{this.renderClaps()}
								</>
							) : (
								<>
									<Text style={styles.clapNumber}>{iconText}</Text>
									<TouchableOpacity
										activeOpacity={0.7}
										style={styles.clapButton}
										onPress={() => this.onLikePress(post, myLike)}>
										<Image
											source={require('../../../assets/hand-clap-ol-2-512.png')}
											style={styles.clapImage}
											title='ClapImage'
										/>
									</TouchableOpacity>
								</>
							)}
						</View>
					)}
				</View>
			</View>
		);
	};

	render() {
		const posts = this.props.posts || [];
		const unseenLikes = this.props.unseenLikes || [];

		posts.sort((a, b) => b.id - a.id);
		unseenLikes.sort((a, b) => b.id - a.id);

		return (
			<View>
				<View style={styles.container}>
					<Text style={styles.headline}>Feed</Text>
				</View>

				<FlatList
					style={styles.feed}
					data={posts}
					renderItem={({ item }) => this.renderPost(item)}
					keyExtractor={item => item.id.toString()}
					showsVerticalScrollIndicator={false}
				/>

				<View>
					<Modal animationType='slide' transparent={true} visible={this.state.modalVisible}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<AntDesign
									name='close'
									size={24}
									color='white'
									onPress={() => this.onCloseModal(unseenLikes)}
									style={styles.xbutton}
								/>
								<Text style={styles.modalText}> Notifications {'\n'} </Text>
								<View style={styles.modalInnerTextContainer}>
									<ScrollView>
										{unseenLikes.map(post => {
											let object = this.stringifyNotification(post);
											return (
												<Text style={styles.modalInnerText} key={object.id}>
													{object.text}
												</Text>
											);
										})}
									</ScrollView>
								</View>
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}

const mapState = state => {
	return {
		posts: state.posts,
		unseenLikes: state.unseenLikes
	};
};

const mapDispatch = dispatch => ({
	getPosts: () => dispatch(getPosts()),
	likePost: postId => dispatch(likePost(postId)),
	unlikePost: postId => dispatch(unlikePost(postId)),
	getUnseenLikes: () => dispatch(getUnseenLikes()),
	updateLikesToSeen: unseenLikes => dispatch(updateLikesToSeen(unseenLikes))
});

export default connect(mapState, mapDispatch)(FeedScreen);
