import React from 'react';
import { Text } from 'react-native';
import { toRelativeDate } from '../../services/date';

export default function DateDisplay(props) {
    const { date } = props;
    const formattedDate = toRelativeDate(date);
    return (
        <Text style={props.style} {...props}>
            {formattedDate}
        </Text>
    );
}
