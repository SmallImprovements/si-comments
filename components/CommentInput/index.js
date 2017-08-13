import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text, View, TextInput, Button } from 'react-native';
import styleVars from '../../assets/styles/vars';
import { postComment } from '../../services/api';

const { standardPadding } = styleVars;

const CommentInputContainer = styled.View`
  background: white;
  borderWidth: 1px
  borderColor: lightgray;
  borderLeftWidth: 0;
  borderRightWidth: 0;
  flex-direction: row;
  align-items: center;
`;
const CommentInputField = styled.TextInput`
  padding: ${standardPadding * 0.75}px;
  flex-grow: 1;
`;

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      comment: null,
      isSubmitting: false,
    };
  }

  handleCommentChange(value) {
    this.setState({ comment: value });
  }

  onSubmit() {
    const { comment } = this.state;
    const { entityId, moduleType } = this.props;
    const requestConfig = {
      entityId,
      moduleType,
      data: {
        comment,
      },
    };
    this.setState({ isSubmitting: true });
    postComment(requestConfig).then(this.setState({ isSubmitting: false })).catch();
  }

  render() {
    const { inputRef } = this.props;
    const { isSubmitting } = this.state;
    return (
      <CommentInputContainer>
        <CommentInputField placeholder="Write a comment..." onChangeText={this.handleCommentChange} />
        <Button title="Post" onPress={this.onSubmit} />
        <Text>
          {isSubmitting ? 'Submitting' : null}
        </Text>
      </CommentInputContainer>
    );
  }
}
