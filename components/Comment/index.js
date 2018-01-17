import React from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS, Alert, Clipboard } from 'react-native';
import Avatar from '../Avatar';
import HTMLView from 'react-native-htmlview';
import { doDeleteComment } from './service';

import Container from './styled/Container';
import Content from './styled/Content';
import TextContainer from './styled/TextContainer';
import CommentDate from './styled/CommentDate';
import SubduedText from '../SubduedText';

export default function Comment(props) {
    const { moduleType, onPressReply, doGetComments } = props;
    let commentData = props;
    let masterEntityId;

    const isPraise = moduleType === 'MESSAGE' || moduleType === 'PRAISE';

    if (isPraise) {
        commentData = transformPraiseCommentModel(commentData);
        masterEntityId = commentData.masterMessageId;
    } else {
        masterEntityId = commentData.objectiveId;
    }

    const { body, createdAt, id } = commentData;
    const { logo, name } = commentData.author;
    const { canEditMessage } = commentData.permissions;

    const deleteProps = {
        masterEntityId,
        id,
        moduleType,
        doGetComments,
    };

    const showCommentOptions = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit', 'Copy Comment Text', 'Delete', 'Cancel'],
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
                        return doDeleteComment(deleteProps);
                    default:
                        break;
                }
            }
        );
    };
    return canEditMessage ? (
        <TouchableOpacity onLongPress={showCommentOptions}>
            <CommentBody logo={logo} body={body} createdAt={createdAt} onPressReply={onPressReply} name={name} />
        </TouchableOpacity>
    ) : (
        <CommentBody logo={logo} body={body} createdAt={createdAt} onPressReply={onPressReply} name={name} />
    );
}

function CommentBody({ logo, body, createdAt, onPressReply, name }) {
    return (
        <Container>
            <Avatar logoUrl={logo} />
            <Content>
                <TextContainer>
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    <HTMLView value={body ? body : 'Empty comment'} />
                </TextContainer>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <CommentDate date={createdAt} />
                    <Text> · </Text>
                    <TouchableOpacity onPress={onPressReply}>
                        <SubduedText bold={true}>Reply</SubduedText>
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>
    );
}

/*
    We do this because the shape of praise comments is a little different.
    We should probably unify this
*/
function transformPraiseCommentModel(commentData) {
    const { message, date } = commentData;
    return {
        body: message,
        createdAt: date,
        ...commentData,
    };
}
