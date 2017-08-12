import React from 'react';
import styled from 'styled-components/native';
import Svg from './Svg';
import { View, Image } from 'react-native';
import { endsWith } from 'lodash';

const AVATAR_SIZE = 30;
const BASE_URL = 'http://localhost:8080';

const AvatarContainer = styled.View`
	border-radius: ${AVATAR_SIZE / 2}px;
	width: ${AVATAR_SIZE}px;
	height: ${AVATAR_SIZE}px;
	overflow: hidden;
`;

const StyledImage = styled.Image`
	width: ${AVATAR_SIZE}px;
	height: ${AVATAR_SIZE}px;
`;

// Svg does not play nicely with Styled-Components, so pass in style as a normal object
const SvgStyle = {
	width: AVATAR_SIZE,
	height: AVATAR_SIZE,
};

export default function Avatar(props) {
	const { logoUrl } = props;

	const avatarSource = {
		uri: `${BASE_URL}${logoUrl}`,
	};
	return (
		<AvatarContainer>
			{endsWith(logoUrl, 'svg')
				? <Svg style={SvgStyle} source={avatarSource} />
				: <StyledImage source={avatarSource} {...props} />}
		</AvatarContainer>
	);
}
