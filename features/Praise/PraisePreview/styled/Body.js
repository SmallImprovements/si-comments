import styled from 'styled-components/native';
import styleVars from '../../../../assets/styles/vars';
import HTMLView from 'react-native-htmlview';

const { standardPadding } = styleVars;
const Body = styled(HTMLView)`
    width: 100%;
    margin-bottom: ${standardPadding}px;
`;

export default Body;
