import styled from 'styled-components/native';
import { HeaderTwo } from '../../../components/Header';
import colorVars from '../../../assets/styles/colours';
import styleVars from '../../../assets/styles/vars';

const { SIBlack } = colorVars;
const { standardPadding } = styleVars;
const LoginSubHeaderText = styled(HeaderTwo)`
    color: ${SIBlack};
    text-align: center;
    margin: ${standardPadding}px 0;
`;

export default LoginSubHeaderText;
