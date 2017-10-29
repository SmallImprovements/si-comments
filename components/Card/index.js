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
    shadowColor: black;
    shadowOffset: 2px;
    shadowOpacity: 0.04;
    shadowRadius: 4px;
`;

export default Card;
