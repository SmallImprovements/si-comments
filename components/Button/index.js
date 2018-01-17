import React from 'react';
import Container from './styled/Container';
import Text from './styled/Text';

export default function StyledButton(props) {
    return (
        <Container onPress={props.onPress} {...props} activeOpacity={0.7}>
            <Text>{props.title}</Text>
        </Container>
    );
}
