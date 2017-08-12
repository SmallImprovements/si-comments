import React from 'react';
import { ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../../components/CommentInput';
import Comment from '../../components/Comment';
import EntityPreview from '../../components/EntityPreview';
import { mockComments, mockObjective } from '../../api/mockData';
import styled from 'styled-components/native';
import CommentsList from '../CommentsList';

export default function EntityCommentView(props) {
    const { navigation } = props;
    const PostCommentContainer = styled.View`flex-grow: 0;`;
    const { moduleType, entityId } = navigation.state.params;
    return (
        <KeyboardAwareScrollView
            navigation={navigation}
            contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <ScrollView style={{ flex: 1 }}>
                <EntityPreview type={moduleType} entityId={entityId} />
                <CommentsList entityId={entityId} moduleType={moduleType} />
            </ScrollView>
            <PostCommentContainer>
                <CommentInput />
            </PostCommentContainer>
        </KeyboardAwareScrollView>
    );
}

EntityCommentView.navigationOptions = ({ navigation, screenProps }) => {
    return {
        title: 'Comments',
    };
};
