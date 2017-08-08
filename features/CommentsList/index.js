import React from 'react';
import { ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../../components/CommentInput';
import Comment from '../../components/Comment';
import EntityPreview from '../../components/EntityPreview';
import { mockComments, mockObjective } from '../../api/mockData';
import styled from 'styled-components/native';

export default function CommentsList({ navigation }) {
    const PostCommentContainer = styled.View`flex-grow: 0;`;
    return (
        <KeyboardAwareScrollView
            navigation={navigation}
            contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <ScrollView style={{ flex: 1 }}>
                <EntityPreview type="OBJECTIVE" entity={mockObjective} />
                <Text>
                    {navigation.state.params.notification_id}
                </Text>
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
