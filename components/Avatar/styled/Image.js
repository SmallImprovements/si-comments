import styled from 'styled-components/native';
import Svg from '../../Svg';

const AvatarImage = styled.Image`
    width: ${props => props.avatarSize}px;
    height: ${props => props.avatarSize}px;
`;

const AvatarSvg = styled(Svg)`
    width: ${props => props.avatarSize}px;
    height: ${props => props.avatarSize}px;
`;

export { AvatarImage, AvatarSvg };
