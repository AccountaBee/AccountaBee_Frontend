import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase/config';
import TimeAgo from 'react-native-timeago';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export default RenderPost = props => {
	const { post } = props;
	const { completedDays, title, targetDaysMet, createdAt } = post;
	const { firstName } = post.user;
	const currentUid = firebase.auth().currentUser.uid;

	const isGoalSettingPost = post.completedDays === 0;

	const likeWord = isGoalSettingPost ? 'Encouragement' : 'Clap';

	let postText;

	if (isGoalSettingPost) {
		postText = `${firstName} set a goal to complete ${post.frequency || 3} ${
			post.frequency === 1 ? 'day' : 'days'
		} of ${title} this week!`;
	} else {
		postText = `${firstName} has completed ${targetDaysMet ? 'ALL' : ''} ${completedDays} ${
			completedDays === 1 ? 'day' : 'days'
		} of their ${title} goal!`;
	}

	let myLike = post.likes.filter(like => like.userUid === currentUid);

	return (
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

				<Text style={styles.post}>{postText}</Text>

				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.clapButton}
					onPress={() => props.onLikePress(post, myLike)}>
					<View style={{ flexDirection: 'row', marginTop: 10 }}>
						{isGoalSettingPost ? (
							<AntDesign
								name='smileo'
								size={24}
								color='black'
								style={{ marginTop: 7, marginRight: 1 }}
							/>
						) : (
							<View>
								{myLike.length ? (
									<Image
										source={require('../../../assets/hand-clap-green.png')}
										style={styles.clapImage}
										title='ClapImage'
									/>
								) : (
									<Image
										source={require('../../../assets/hand-clap-ol-2-512.png')}
										style={styles.clapImage}
										title='ClapImage'
									/>
								)}
							</View>
						)}

						<EvilIcons
							name='comment'
							size={38}
							color='black'
							style={{ marginTop: 7, marginRight: 1 }}
						/>
					</View>
				</TouchableOpacity>

				{post.likes.length === 1 ? (
					<Text style={styles.clapNumber}>
						{post.likes.length} {likeWord}
					</Text>
				) : (
					<Text style={styles.clapNumber}>
						{post.likes.length} {likeWord}s
					</Text>
				)}
				<Text style={styles.viewAllComments}>View all 9 comments</Text>
			</View>
		</View>
	);
};
