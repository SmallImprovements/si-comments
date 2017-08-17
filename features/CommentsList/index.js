import React from 'react';
import { View } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator } from 'react-native';
export default function CommentsList({ comments, moduleType }) {
	return (
		<View>
			{comments.length
				? comments.map(comment => <Comment {...comment} key={comment.id} moduleType={moduleType} />)
				: <ActivityIndicator />}
		</View>
	);
}
