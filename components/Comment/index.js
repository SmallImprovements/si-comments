import React from "react";
import styled from "styled-components/native";
import { View, Text, Button } from "react-native";
import styleVars from "../../assets/styles/vars";
import Author from "../Author";
import Flex from "../Flex";

const { standardPadding, commentBorder, commentBackgroundColour } = styleVars;

const CommentContainer = styled.View`
	border-radius: 3px;
	margin-right: 10px;
	display: flex;
	flex-wrap: wrap;
	margin-top: -1px;
	padding: ${standardPadding * 0.25}px;
	border: ${commentBorder};
	background-color: ${commentBackgroundColour};
	width: 100%;
`;

const CommentText = styled.Text`margin-bottom: ${standardPadding * 0.5}px;`;
const SmallTextButton = styled.Button`font-size: 9px;`;

export default function Comment({ content, author, num_likes_this }) {
	return (
		<CommentContainer>
			<Author {...author} />
			<CommentText>
				{content}
			</CommentText>
			<Flex style={{ alignItems: "center" }}>
				<Text>
					{num_likes_this} Likes
				</Text>
				<SmallTextButton title="Reply" />
				<SmallTextButton title="Like" />
			</Flex>
		</CommentContainer>
	);
}
