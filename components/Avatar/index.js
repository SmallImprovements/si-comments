import React from 'react';
import styled from 'styled-components/native';
import Svg from '../Svg';
import { endsWith } from 'lodash';
import { BASE_URL } from '../../services/auth/factory';

import Container from './styled/Container.js';
import { AvatarSvg, AvatarImage } from './styled/Image.js';

Avatar.defaultProps = {
    avatarSize: 30,
};

export default function Avatar(props) {
    const { logoUrl, avatarSize } = props;
    const imageProps = {
        source: {
            uri: `${BASE_URL}${logoUrl}`,
        },
        avatarSize,
    };

    return (
        <Container avatarSize={avatarSize}>
            {endsWith(logoUrl, 'svg') || endsWith(logoUrl, 'svg?v=2') ? (
                <AvatarSvg {...imageProps} />
            ) : (
                <AvatarImage {...imageProps} />
            )}
        </Container>
    );
}
