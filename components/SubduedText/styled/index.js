import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { subduedTextColor } = styleVars;

const SubduedText = styled.Text`
    color: ${subduedTextColor};
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;

export default SubduedText;
