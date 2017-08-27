import React from 'react';
import { Text } from 'react-native';
import { toRelativeDate } from '../services/date';
// import styled from 'styled-components/native';
// import colorVars from '../assets/styles/colours';
// import styleVars from '../assets/styles/vars';

export default function DateDisplay(props) {
	const { date } = props;
	const formattedDate = toRelativeDate(date);
	return (
		<Text style={props.style} {...props}>
			{formattedDate}
		</Text>
	);
}
