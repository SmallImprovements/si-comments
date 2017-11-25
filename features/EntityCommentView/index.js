import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Notifications } from 'expo';
import CommentInput from '../../components/CommentInput';
import EntityPreview from './EntityPreview';
import styled from 'styled-components/native';
import CommentsList from '../CommentsList';
import { getComments } from '../../services/api';
import styleVars from '../../assets/styles/vars';

const { navigationBorderColor } = styleVars;
const PostCommentContainer = styled.View`
    flex-grow: 0;
`;
export default class EntityCommentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
        };
        this.inputRefs = {};
    }

    doGetComments = () => {
        const { navigation } = this.props;
        const { entityId, moduleType } = navigation.state.params;
        return getComments(entityId, moduleType).then(res => {
            this.setState({ comments: res });
            this.inputRefs.scrollView.scrollToEnd();
        });
    };

    focusCommentInputField = () => {
        this.inputRefs.commentInput.inputField.focus();
    };

    componentDidMount() {
        const { navigation } = this.props;
        const { entityId, moduleType } = navigation.state.params;
        this.doGetComments(entityId, moduleType);
    }

    handleNotification = () => {
        /*
            This is used to fake our live updating. 
            Basically if the user receives ANY push notifications, 
            it forces this screen to re-fetch in case there are new comments. 
        */
        this.doGetComments();
    };

    componentWillMount() {
        this.notificationSubscription = Notifications.addListener(this.handleNotification);
    }

    componentWillUnmount() {
        this.notificationSubscription.remove();
    }

    render() {
        const { navigation } = this.props;
        const { comments } = this.state;

        const { moduleType, entityId } = navigation.state.params;
        const entityProps = {
            moduleType,
            entityId,
        };
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={60}
                style={{
                    height: '100%',
                }}
            >
                <ScrollView style={{ flex: 1 }} ref={input => (this.inputRefs.scrollView = input)}>
                    <EntityPreview {...entityProps} />
                    <CommentsList
                        {...entityProps}
                        comments={comments}
                        onPressReply={this.focusCommentInputField}
                        doGetComments={this.doGetComments}
                    />
                </ScrollView>
                <PostCommentContainer>
                    <CommentInput
                        ref={ch => (this.inputRefs.commentInput = ch)}
                        {...entityProps}
                        doGetComments={this.doGetComments}
                    />
                </PostCommentContainer>
            </KeyboardAvoidingView>
        );
    }
}

EntityCommentView.navigationOptions = () => {
    return {
        title: 'Comments',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: navigationBorderColor,
        },
    };
};
