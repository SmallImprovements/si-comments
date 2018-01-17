import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { standardPadding } = styleVars;

export default (TextContainer = styled.View`
    margin-bottom: ${standardPadding * 0.5}px;
`);
