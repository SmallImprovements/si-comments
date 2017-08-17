import React from 'react';
import { View } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator } from 'react-native';
import { reverse } from 'lodash';
export default function CommentsList({ comments, moduleType }) {
	let sortedComments = comments;
	if (moduleType === 'OBJECTIVE') {
		sortedComments = reverse(sortedComments);
	}
	return (
		<View>
			{comments.length
				? comments.map(comment => <Comment {...comment} key={comment.id} moduleType={moduleType} />)
				: <ActivityIndicator />}
		</View>
	);
}
