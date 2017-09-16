import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActionSheetIOS, Alert, Clipboard } from 'react-native';
import styleVars from '../../assets/styles/vars';
import Avatar from '../Avatar';
import HTMLView from 'react-native-htmlview';
import DateDisplay from '../DateDisplay';
import { deletePraiseComment } from '../../services/api';
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

function doDelete(isPraise, masterMessageId, id, doGetComments) {
    if (!isPraise) {
        // todo: implement objective comment deletion
        return;
    }
    return deletePraiseComment(masterMessageId, id).then(
        res => {
            const { err } = res;
            if (res.status === 'ERROR') {
                Alert.alert(
                    "Can't delete comment",
                    `${err}`,
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    {
                        cancelable: true,
                    }
                );
            }
            doGetComments();
            return res;
        },
        err => console.log('error deleting comment', err)
    );
}

export default function Comment(props) {
    const { moduleType, onPressReply, doGetComments } = props;
    let commentData = props;
    let canEditMessage, canEditComment;

    const isPraise = moduleType === 'MESSAGE' || moduleType === 'PRAISE';

    if (isPraise) {
        commentData = transformPraiseCommentModel(commentData);
        canEditMessage = commentData.permissions.canEditMessage;
        canEditComment = commentData.permissions.canEditComment;
    }
    const { body, createdAt, masterMessageId, id } = commentData;
    const { logo, name } = commentData.author;

    const showCommentOptions = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit', 'Copy', 'Delete', 'Cancel'],
                cancelButtonIndex: 3,
                destructiveButtonIndex: 2,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        Alert.alert('Not yet implemented', 'You are unable to edit comments', [{ text: 'OK' }], {
                            cancelable: true,
                        });
                        break;

                    case 1:
                        Clipboard.setString(body);
                        break;
                    case 2:
                        doDelete(isPraise, masterMessageId, id, doGetComments);
                        break;
                    default:
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
                    <TouchableOpacity onPress={onPressReply}>
                        <LightGrayText>Reply</LightGrayText>
                    </TouchableOpacity>
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
