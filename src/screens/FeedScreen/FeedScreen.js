import React, { Component } from 'react';
import { Text, View, Modal, Image, TouchableOpacity, SafeAreaView, FlatList, Animated} from 'react-native';
import { connect } from 'react-redux';
import { getUnseenLikes, updateLikesToSeen } from '../../../redux/reducers/unseenLikes';
import { getPosts } from '../../../redux/reducers/posts';
import { likePost, unlikePost } from '../../../redux/reducers/singlePost';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import TimeAgo from 'react-native-timeago';
import { firebase } from '../../firebase/config';
import ClapBubble from './ClapBubble'
import RenderPost from './SinglePost';

class FeedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			clapsVisible: true,
		};
	}

	componentDidMount() {
		this.props.getPosts();
		this.props.getUnseenLikes();
		if (this.props.unseenLikes.length > 0) {
			this.setState({ modalVisible: true });
		}
	}

	animationComplete(){
		this.setState({clapVisible: false})
	}

	renderClaps(){
		return <ClapBubble animationComplete={this.animationComplete.bind(this)}/>
	}

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

	renderPost = post => {
		return <RenderPost post={post} onLikePress={this.onLikePress} />;
	};

	stringifyNotification = post => {
		const baseText = `cheered you on for completing ${post.completedDays} ${
			post.completedDays === 1 ? 'day' : 'days'
		} of ${post.title}`;

		let text;

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
		let { completedDays, title, targetDaysMet, createdAt } = post;
		let { firstName } = post.user;
		let currentUid = firebase.auth().currentUser.uid;
		let myLike = post.likes.filter(like => like.userUid === currentUid);

		return (
			<SafeAreaView>
			<View style={styles.feedItem} key={post.id}>
				<Image source={require('../../../assets/blank-profile.png')} style={styles.userImage} />
				<View style={{ flex: 1 }}>
					<View style={styles.feedContent}>
						<View>
							<Text style={styles.userName}>{firstName}</Text>
							<View>
								<TimeAgo time={createdAt} />
							</View>
						</View>
					</View>

					<Text style={styles.post}>
						{`${firstName} has completed ${targetDaysMet ? 'ALL' : ''} ${completedDays} ${
							completedDays === 1 ? 'day' : 'days'
						} of their ${title} goal!`}
					</Text>

					
						<View style={{ flexDirection: 'row', flex: 1}}>
							{myLike.length ? (
								<View>
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
								</View>
							) : (
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
							)}
							{post.likes.length <= 1 ? (
								<Text style={styles.clapNumber}>{post.likes.length} Clap</Text>
								) : (
								<Text style={styles.clapNumber}>{post.likes.length} Claps</Text>
							)}
						</View>
				</View>
			</View>
			</SafeAreaView>
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
