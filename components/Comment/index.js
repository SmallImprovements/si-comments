import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableHighlight } from 'react-native';
import styleVars from '../../assets/styles/vars';
import Avatar from '../Avatar';
import Flex from '../Flex';

const { standardPadding, commentBorder, commentBackgroundColour } = styleVars;

const CommentContainer = styled.View`
    border-radius: 3px;
    margin-right: 10px;
    flex-direction: row;
    padding: ${standardPadding * 0.5}px 0;
    border: ${commentBorder};
    margin-top: -1px;
    background-color: ${commentBackgroundColour};
    width: 100%;
`;

const CommentContentContainer = styled.View`
    flex-shrink: 1;
    padding: 0 ${standardPadding * 0.5}px;
`;

const LightGrayText = styled.Text`color: gray;`;

const CommentText = styled.Text`margin-bottom: ${standardPadding * 0.5}px;`;

export default function Comment(props) {
    const { moduleType } = props;
    let commentData = props;

    if (moduleType === 'MESSAGE') {
        commentData = transformPraiseCommentModel(commentData);
    }

    const { body } = commentData;
    const { logo, name } = commentData.author;

    return (
        <CommentContainer>
            <Avatar logoUrl={logo} />
            <CommentContentContainer>
                <CommentText>
                    <Text style={{ fontWeight: 'bold' }}>
                        {name}
                    </Text>
                    {body}
                </CommentText>
                <TouchableHighlight onPress={() => console.log('clicked Reply')}>
                    <LightGrayText>Reply</LightGrayText>
                </TouchableHighlight>
            </CommentContentContainer>
        </CommentContainer>
    );
}

function transformPraiseCommentModel(data) {
    const { message } = data;
    return {
        body: message,
        ...data,
    };
}
