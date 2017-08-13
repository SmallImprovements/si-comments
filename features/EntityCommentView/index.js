import React from 'react';
import { ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../../components/CommentInput';
import Comment from '../../components/Comment';
import EntityPreview from '../../components/EntityPreview';
import styled from 'styled-components/native';
import CommentsList from '../CommentsList';

export default function EntityCommentView({ navigation }) {
    const PostCommentContainer = styled.View`flex-grow: 0;`;
    const { moduleType, entityId } = navigation.state.params;
    const entityProps = {
        moduleType,
        entityId,
    };
    return (
        <KeyboardAwareScrollView
            navigation={navigation}
            extraHeight={85}
            contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
            }}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView style={{ flex: 1 }}>
                <EntityPreview {...entityProps} />
                <CommentsList {...entityProps} />
            </ScrollView>
            <PostCommentContainer>
                <CommentInput {...entityProps} />
            </PostCommentContainer>
        </KeyboardAwareScrollView>
    );
}

EntityCommentView.navigationOptions = ({ navigation, screenProps }) => {
    return {
        title: 'Comments',
    };
};
