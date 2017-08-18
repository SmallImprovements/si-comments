import React from 'react';
import { View } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator } from 'react-native';
import { reverse } from 'lodash';
export default function CommentsList({ comments, moduleType, onPressReply, inputRef }) {
	let sortedComments = comments;
	if (moduleType === 'OBJECTIVE') {
		sortedComments = reverse(sortedComments);
	}
	return (
		<View>
			{sortedComments.length
				? sortedComments.map(comment =>
						<Comment
							{...comment}
							key={comment.id}
							moduleType={moduleType}
							onPressReply={onPressReply}
							inputRef={inputRef}
						/>
					)
				: <ActivityIndicator />}
		</View>
	);
}
