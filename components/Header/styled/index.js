import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { fontSizeXL, fontSizeL } = styleVars;

export const HeaderOne = styled.Text`
    font-size: ${fontSizeXL}px;
    font-weight: bold;
    text-align: ${props => props.textAlign || 'left'};
`;
export const HeaderTwo = styled.Text`
    font-size: ${fontSizeL}px;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    text-align: ${props => props.textAlign || 'left'};
`;
