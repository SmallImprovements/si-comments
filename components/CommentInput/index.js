import React from 'react';
import styled from 'styled-components/native';
import { View, TextInput, Button } from 'react-native';
import styleVars from '../../assets/styles/vars';

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

export default function CommentInput() {
    return (
        <CommentInputContainer>
            <CommentInputField placeholder="Write a comment..." />
            <Button title="Post" onPress={() => console.log('pressed')} />
        </CommentInputContainer>
    );
}
