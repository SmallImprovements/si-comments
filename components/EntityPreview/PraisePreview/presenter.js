import React from 'react';
import { View, Text, Alert, TouchableHighlight } from 'react-native';
import Flex from '../../Flex';

const showAlert = () =>
	Alert.alert('Open in Small Improvements?', "You'll be redirected to the Small Improvements app your browser", [
		{ text: 'Open', onPress: () => console.log('Open Pressed') },
		{
			text: 'Cancel',
			onPress: () => console.log('Cancel Pressed'),
			style: 'cancel',
		},
	]);

export default function PraisePreview({ praise }) {
	const { title, author } = praise;
	return (
		<TouchableHighlight onPress={showAlert}>
			<Flex>
				<View>
					<Text style={{ fontWeight: 'bold' }}>
						{title}
					</Text>
					<Text>
						Written by: {author.name}
					</Text>
				</View>
			</Flex>
		</TouchableHighlight>
	);
}
