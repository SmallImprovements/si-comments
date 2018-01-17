import styled from 'styled-components/native';
import { HeaderOne } from '../../../components/Header';
import colorVars from '../../../assets/styles/colours';

const { SIBlack } = colorVars;
const LoginHeaderText = styled(HeaderOne)`
    color: ${SIBlack};
    text-align: center;
`;

export default LoginHeaderText;
