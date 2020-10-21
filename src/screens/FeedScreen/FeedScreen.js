import React, { Component } from "react";
import { Text, View, Modal, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { connect } from "react-redux";
import { getUnseenLikes } from "../../../redux/reducers/likes";
import { getPosts } from "../../../redux/reducers/posts";
import { likePost } from "../../../redux/reducers/singlePost";
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles'

// TODO - make notification icon
// only send a limited number of posts

class FeedScreen extends Component {
	state = {
		modalVisible : true
	}

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
			post.completedDays === 1 ? "day" : "days"
		} of ${post.title}`;
		let text;
		if (post.likes.length === 1) {
			text = `${post.likes[0].user.firstName} ${baseText}`;
		} else if (post.likes.length === 2) {
			text = `${post.likes[0].user.firstName} and ${post.likes[1].user.firstName} ${baseText}`;
		} else {
			text = `${post.likes[0].user.firstName} and &${post.likes[1].user.firstName} and ${
				post.likes.length - 2
			} other ${post.likes.length - 2 === 1 ? "friend" : "friends"} ${baseText}`;
		}
		return { id: post.id, text: text };
	};

	renderPost = post =>{
		let { completedDays, title, targetDaysMet, createdAt} = post;
		let { firstName } = post.user;
		
		return (
			<View style={styles.feedItem} key ={post.id}>
				<Image
					source={require('../../../assets/blank-profile.png')}
					style={styles.userImage}
				/>
				<View style={{ flex: 1 }}>
					<View style={styles.feedContent}>
						<View>
							<Text style={styles.userName}>{firstName}</Text>
							<Text>{createdAt}</Text>
						</View>
					</View>
						
						<Text style={styles.post}>
							{`${firstName} has completed ${targetDaysMet ? "ALL" : ""} ${completedDays} ${
								completedDays === 1 ? "day" : "days"} of their ${title} goal!`}
						</Text>

						<TouchableOpacity 
							activeOpacity={0.5} 
							style={styles.clapButton}
							onPress={() => this.onLikePress(post.id)}
						>
							<View style={{flexDirection:'row', marginTop:10}}>
								<Image 
									source={require('../../../assets/hand-clap-ol-2-512.png')} 
									style={styles.clapImage}
									title="ClapImage"
								/>

								<EvilIcons name="comment" size={38} color="black" style={{marginTop:7, marginRight:1}} />
							</View>
						</TouchableOpacity>

						{post.likes.length<=1?(<Text style={styles.clapNumber}>{post.likes.length} Clap</Text>):(<Text style={styles.clapNumber}>{post.likes.length} Claps</Text>)}
						<Text style={styles.viewAllComments}>View all 9 comments</Text>
				</View>
				
			</View>
		)
	}

	render() {
		const posts = this.props.posts || [];
		const unseenLikes = this.props.likes || [];

		posts.sort((a, b) => b.id - a.id);

		return (
			// need to add scrolling or paginaton or something
			<View >
				<View style={styles.container} >
					<Text style={styles.headline}>Feed</Text>
				</View>

				<FlatList 
					style={styles.feed}
					data={posts}
					renderItem={({item})=>this.renderPost(item)}
					keyExtractor ={item=>item.id}
					showsVerticalScrollIndicator={false}
				/>
				

				{/* THIS WILL BE IN THE MODAL */}
				{/* <Text>Notifications</Text>
				{unseenLikes.map(post => {
					let object = this.stringifyNotification(post);
					return <Text key={object.id}>{object.text}</Text>;
				})} */}

				<View>
					
					<Modal animationType="slide" transparent={true} visible={true}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<AntDesign name="close" size={24} color="white" onPress={()=>this.setState({modalVisible : false})} style={styles.xbutton} />
								<Text style={styles.modalText}> Notification {"\n"} </Text>
									<View style={styles.modalInnerTextContainer}>
									<ScrollView>
										{unseenLikes.map(post => {
											let object = this.stringifyNotification(post);
												return <Text style={styles.modalInnerText} key={object.id}>{object.text}</Text>;
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
		likes: state.likes
	};
};

const mapDispatch = dispatch => ({
	getPosts: () => dispatch(getPosts()),
	likePost: postId => dispatch(likePost(postId)),
	getUnseenLikes: () => dispatch(getUnseenLikes())
});

export default connect(mapState, mapDispatch)(FeedScreen);
