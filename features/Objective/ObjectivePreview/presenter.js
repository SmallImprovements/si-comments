import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import Flex from '../../../components/Flex';

const ObjectiveIcon = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-right: 10px;
`;

const showAlert = () =>
    /* eslint-disable no-console */
    Alert.alert('Open in Small Improvements?', "You'll be redirected to the Small Improvements app your browser", [
        { text: 'Open', onPress: () => console.log('Open Pressed') },
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
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
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{title}</Text>

                    <Text style={{ color: '#777' }}>{cycleName}</Text>
                </View>
            </Flex>
        </TouchableOpacity>
    );
}
