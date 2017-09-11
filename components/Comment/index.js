import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableHighlight, TouchableOpacity, ActionSheetIOS } from 'react-native';
import styleVars from '../../assets/styles/vars';
import Avatar from '../Avatar';
import HTMLView from 'react-native-htmlview';
import DateDisplay from '../DateDisplay';
const { standardPadding, commentBorder, commentBackgroundColour, subduedTextColor } = styleVars;

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

const LightGrayText = styled.Text`
    color: ${subduedTextColor};
    font-weight: bold;
`;

const CommentText = styled.View`margin-bottom: ${standardPadding * 0.5}px;`;
const CommentDate = styled(DateDisplay)`color: ${subduedTextColor};`;

export default function Comment(props) {
    const { moduleType, onPressReply } = props;
    let commentData = props;
    let canEditMessage, canEditComment;

    const isPraise = moduleType === 'MESSAGE' || moduleType === 'PRAISE';

    if (isPraise) {
        commentData = transformPraiseCommentModel(commentData);
        canEditMessage = commentData.permissions.canEditMessage;
        canEditComment = commentData.permissions.canEditComment;
    }

    const { body, createdAt } = commentData;
    const { logo, name } = commentData.author;

    const showCommentOptions = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit', 'Delete', 'Cancel'],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        console.log('edit');
                        break;
                    case 1:
                        console.log('delete');
                        break;
                }
            }
        );
    };
    return canEditMessage && canEditMessage ? (
        <TouchableOpacity onLongPress={showCommentOptions}>
            <CommentBody logo={logo} body={body} createdAt={createdAt} onPressReply={onPressReply} name={name} />
        </TouchableOpacity>
    ) : (
        <CommentBody logo={logo} body={body} createdAt={createdAt} onPressReply={onPressReply} name={name} />
    );
}

function CommentBody({ logo, body, createdAt, onPressReply, name }) {
    return (
        <CommentContainer>
            <Avatar logoUrl={logo} />
            <CommentContent>
                <CommentText>
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    <HTMLView value={body ? body : 'Empty comment'} />
                </CommentText>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <CommentDate date={createdAt} />
                    <Text> · </Text>
                    <TouchableHighlight onPress={onPressReply}>
                        <LightGrayText>Reply</LightGrayText>
                    </TouchableHighlight>
                </View>
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
