import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { standardPadding } = styleVars;
const Logo = styled.Image`
    width: ${standardPadding * 3}px;
    height: ${standardPadding * 3}px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${standardPadding}px;
`;

export default Logo;
