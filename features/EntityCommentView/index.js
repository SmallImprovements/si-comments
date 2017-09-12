import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommentInput from '../../components/CommentInput';
import EntityPreview from './EntityPreview';
import styled from 'styled-components/native';
import CommentsList from '../CommentsList';
import { getComments } from '../../services/api';

export default class EntityCommentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
        };
        this.inputRefs = {};
    }
    doGetComments() {
        const { navigation } = this.props;
        const { entityId, moduleType } = navigation.state.params;
        return getComments(entityId, moduleType).then(res => {
            this.setState({ comments: res });
            this.inputRefs.scrollView.scrollToEnd();
        });
    }

    focusCommentInputField() {
        this.inputRefs.commentInput.inputField.focus();
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { entityId, moduleType } = navigation.state.params;
        this.doGetComments(entityId, moduleType);
    }

    _handleNotification = () => {
        this.doGetComments();
    };

    componentWillMount() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillUnmount() {
        this._notificationSubscription.remove();
    }

    render() {
        const { navigation } = this.props;
        const { comments } = this.state;
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
                <ScrollView style={{ flex: 1 }} ref={input => (this.inputRefs.scrollView = input)}>
                    <EntityPreview {...entityProps} />
                    <CommentsList
                        {...entityProps}
                        comments={comments}
                        onPressReply={this.focusCommentInputField.bind(this)}
                    />
                </ScrollView>
                <PostCommentContainer>
                    <CommentInput
                        ref={ch => (this.inputRefs.commentInput = ch)}
                        {...entityProps}
                        doGetComments={this.doGetComments.bind(this)}
                    />
                </PostCommentContainer>
            </KeyboardAwareScrollView>
        );
    }
}

EntityCommentView.navigationOptions = () => {
    return {
        title: 'Comments',
    };
};
