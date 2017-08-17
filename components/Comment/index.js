import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableHighlight } from 'react-native';
import styleVars from '../../assets/styles/vars';
import Avatar from '../Avatar';
import HTMLView from 'react-native-htmlview';
const { standardPadding, commentBorder, commentBackgroundColour } = styleVars;

const CommentContainer = styled.View`
    border-radius: 3px;
    margin-right: 10px;
    flex-direction: row;
    padding: ${standardPadding * 0.5}px;
    border: ${commentBorder};
    margin-top: -1px;
    background-color: ${commentBackgroundColour};
    width: 100%;
`;

const CommentContent = styled.View`
    flex-shrink: 1;
    margin-left: ${standardPadding * 0.5}px;
`;

const LightGrayText = styled.Text`color: gray;`;

const CommentText = styled.View`margin-bottom: ${standardPadding * 0.5}px;`;

export default function Comment(props) {
    const { moduleType } = props;
    let commentData = props;

    if (moduleType === 'MESSAGE' || moduleType === 'PRAISE') {
        commentData = transformPraiseCommentModel(commentData);
    }

    const { body } = commentData;
    const { logo, name } = commentData.author;
    return (
        <CommentContainer>
            <Avatar logoUrl={logo} />
            <CommentContent>
                <CommentText>
                    <Text style={{ fontWeight: 'bold' }}>
                        {name}
                    </Text>
                    <HTMLView value={body ? body : 'Empty comment'} />
                </CommentText>

                <TouchableHighlight onPress={() => console.log('clicked Reply')}>
                    <LightGrayText>Reply</LightGrayText>
                </TouchableHighlight>
            </CommentContent>
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
