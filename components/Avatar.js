import React from 'react';
import styled from 'styled-components/native';
import Svg from './Svg';
import { endsWith } from 'lodash';
import { BASE_URL } from '../services/auth/factory';

export default function Avatar(props) {
    const { logoUrl, avatarSize } = props;
    const avatarSource = {
        uri: `${BASE_URL}${logoUrl}`,
    };
    const AVATAR_SIZE = avatarSize || 30;
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

    const StyledSVG = styled(Svg)`
        width: ${AVATAR_SIZE}px;
        height: ${AVATAR_SIZE}px;
    `;

    return (
        <AvatarContainer>
            {endsWith(logoUrl, 'svg') || endsWith(logoUrl, 'svg?v=2') ? (
                <StyledSVG source={avatarSource} />
            ) : (
                <StyledImage source={avatarSource} {...props} />
            )}
        </AvatarContainer>
    );
}
