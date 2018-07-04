import styled from 'styled-components/native';

export default (AvatarContainer = styled.View`
    border-radius: ${props => props.avatarSize / 2}px;
    width: ${props => props.avatarSize}px;
    height: ${props => props.avatarSize}px;
    overflow: hidden;
`);
