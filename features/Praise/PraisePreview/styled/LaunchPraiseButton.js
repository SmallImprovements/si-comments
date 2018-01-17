import styled from 'styled-components/native';
import styleVars from '../../../../assets/styles/vars';

const { standardPadding } = styleVars;
const LaunchPraiseButton = styled.TouchableOpacity`
    flex-basis: 100%;
    width: 100%;
    margin-bottom: ${standardPadding}px;
`;

export default LaunchPraiseButton;
