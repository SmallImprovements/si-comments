import React from 'react';
import { ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../../components/CommentInput';
import Comment from '../../components/Comment';
import EntityPreview from '../../components/EntityPreview';
import { mockComments, mockObjective } from '../../api/mockData';
import styled from 'styled-components/native';

export default function CommentsList(props) {
    const { navigation } = props;
    const PostCommentContainer = styled.View`flex-grow: 0;`;
    const { notification_id, module, entityId } = navigation.state.params;
    return (
        <KeyboardAwareScrollView
            navigation={navigation}
            contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <ScrollView style={{ flex: 1 }}>
                <EntityPreview type={module} entityId={entityId} />
                {mockComments.map(comment => <Comment {...comment} key={comment.id} />)}
            </ScrollView>
            <PostCommentContainer>
                <CommentInput />
            </PostCommentContainer>
        </KeyboardAwareScrollView>
    );
}

CommentsList.navigationOptions = ({ navigation, screenProps }) => {
    return {
        title: 'Comment',
    };
};
