import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import Avatar from '../Avatar';
import styleVars from '../../assets/styles/vars';

const { standardPadding } = styleVars;
const AuthorContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: ${standardPadding * 0.25}px 0;
`;
export default function Author({ authorName, imageSource, avatarUrl }) {
    return (
        <AuthorContainer>
            <Avatar source={avatarUrl ? { uri: avatarUrl } : imageSource} />
            <Text>
                {authorName}
            </Text>
        </AuthorContainer>
    );
}
