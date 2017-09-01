import React from 'react';
import { View, Text, Alert, TouchableHighlight } from 'react-native';
import Flex from '../../Flex';
import Avatar from '../../Avatar';
import Badge from '../../Badge';
import { HeaderTwo } from '../../Text';
import styled from 'styled-components/native';
import colorVars from '../../../assets/styles/colours';

const { SIGray3 } = colorVars;
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

const StyledBadge = styled(Badge)`
	width: 50px;
	height: 50px;
	margin-left: -30px;
	margin-top: -25px;
`;

export default function PraisePreview({ praise }) {
	const { title, author, badge, recipients } = praise;
	const firstRecipient = recipients[0];
	return (
		<TouchableHighlight onPress={showAlert}>
			<Flex>
				<StyledBadge badge={badge} />
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						marginLeft: -30,
					}}
				>
					<Avatar avatarSize={60} logoUrl={firstRecipient.logo} />
					<Flex style={{ flexWrap: 'wrap', marginTop: 20 }}>
						<HeaderTwo style={{ fontWeight: 'bold', flexBasis: '100%', textAlign: 'center' }}>
							{title}
						</HeaderTwo>
						<Text style={{ color: SIGray3, flexBasis: '100%', textAlign: 'center' }}>
							Written by: {author.name}
						</Text>
					</Flex>
				</View>
			</Flex>
		</TouchableHighlight>
	);
}
