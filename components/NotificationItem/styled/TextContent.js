import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { standardPadding } = styleVars;

const TextContent = styled.View`
    flex-shrink: 1;
    margin-left: ${standardPadding * 0.5}px;
`;

export default TextContent;
