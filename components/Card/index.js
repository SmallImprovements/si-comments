import styled from 'styled-components/native';
import styleVars from '../../assets/styles/vars';

const { standardPadding, cardBorderRadius, cardBorderColor, cardMargin } = styleVars;
const Card = styled.View`
    padding: ${standardPadding}px;
    background-color: white;
    border-color: ${cardBorderColor};
    border-width: 1px;
    margin: ${cardMargin}px;
    border-radius: ${cardBorderRadius}px;
    shadowcolor: black;
    shadowoffset: 2px;
    shadowopacity: 0.04;
    shadowradius: 4px;
`;

export default Card;
