import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';
import styleVars from '../../assets/styles/vars';
import { postComment } from '../../services/api';

const { standardPadding } = styleVars;

const CommentInputContainer = styled.View`
  background: white;
  borderWidth: 1px
  borderColor: lightgray;
  borderLeftWidth: 0;
  borderRightWidth: 0;
  borderBottomWidth: 0;
  flex-direction: row;
  align-items: center;
  
`;
const CommentInputField = styled.TextInput`
  flex-grow: 1;
  font-size: 15px;
  margin-left: ${standardPadding}px;
  margin-bottom: ${standardPadding}px;
  margin-top: ${standardPadding}px;
`;

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      comment: null,
      isSubmitting: false,
      inputFieldHeight: null,
    };
  }

  handleCommentChange(value) {
    this.setState({ comment: value });
  }

  onContentSizeChange(event) {
    const { contentSize } = event.nativeEvent;

    this.setState({
      inputFieldHeight: contentSize.height > 200 ? 200 : contentSize.height,
    });
  }

  onSubmit() {
    const { comment } = this.state;
    const { entityId, moduleType, doGetComments } = this.props;
    const requestConfig = {
      entityId,
      moduleType,
      comment,
    };

    this.setState({ isSubmitting: true });
    postComment(requestConfig).then(doGetComments()).then(this.setState({ isSubmitting: false, comment: null }));
  }
  render() {
    const { isSubmitting, comment } = this.state;

    const inputFieldProps = {
      editable: !isSubmitting,
      placeholder: 'Write a comment...',
      value: comment,
      onChangeText: this.handleCommentChange,
      multiline: true,
      style: { height: this.state.inputFieldHeight },
      keyboardType: 'default',
      onContentSizeChange: this.onContentSizeChange.bind(this),
      keyboardShouldPersistTaps: 'always',
      innerRef: input => (this.inputField = input),
    };
    return (
      <CommentInputContainer>
        <CommentInputField {...inputFieldProps} />
        <Button title="Post" onPress={this.onSubmit} disabled={isSubmitting || !comment} />
      </CommentInputContainer>
    );
  }
}
