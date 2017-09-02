import React from 'react';
import { View, Button } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator } from 'react-native';
import { reverse } from 'lodash';
import styled from 'styled-components/native';
import colorVars from '../../assets/styles/colours';

export default function CommentsList({ comments, moduleType, onPressReply, inputRef }) {
	let sortedComments = comments;
	if (moduleType === 'OBJECTIVE') {
		sortedComments = reverse(sortedComments);
	}

	if (!sortedComments) {
		return <ActivityIndicator />;
	}
	return !sortedComments
		? <ActivityIndicator />
		: <View>
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
					: <View>
							<NoComments>No Comments</NoComments>
							<Button onPress={onPressReply} title="Write a comment..." />
						</View>}
			</View>;
}

const NoComments = styled.Text`
	text-align: center;
	margin: 40px 0;
	color: ${colorVars.SIGray2};
`;
