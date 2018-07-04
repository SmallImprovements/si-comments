import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Flex from '../../../components/Flex';
import { noop } from 'lodash';
import ObjectiveIcon from '../../../components/ObjectiveIcon';
import SubduedText from '../../../components/SubduedText';
import Container from './styled/Container';
import Title from './styled/Title';

const showAlert = () =>
    /* eslint-disable no-console */
    Alert.alert('Open in Small Improvements?', "You'll be redirected to the Small Improvements app your browser", [
        { text: 'Open', onPress: () => console.log('Open Pressed') },
        {
            text: 'Cancel',
            onPress: noop,
            style: 'cancel',
        },
    ]);
/* eslint-enable no-console */

export default function ObjectivePreview({ objective }) {
    const { title, cycleName } = objective;
    return (
        <TouchableOpacity onPress={showAlert}>
            <Flex>
                <ObjectiveIcon source={require('../../../assets/images/objective_icon.png')} />
                <Container>
                    <Title>{title}</Title>
                    <SubduedText>{cycleName}</SubduedText>
                </Container>
            </Flex>
        </TouchableOpacity>
    );
}
