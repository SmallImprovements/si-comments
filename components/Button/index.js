import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const ButtonWrapper = styled.TouchableOpacity`
    padding: 10px;
    background-color: #ffcc00;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 3px;
`;

const ButtonText = styled.Text`
    text-align: center;
    font-weight: bold;
`;

export default function StyledButton(props) {
    return (
        <ButtonWrapper onPress={props.onPress} {...props} activeOpacity={0.7}>
            <ButtonText>{props.title}</ButtonText>
        </ButtonWrapper>
    );
}
