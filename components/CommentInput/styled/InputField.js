import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { standardPadding } = styleVars;

const InputField = styled.TextInput`
    flex-grow: 1;
    font-size: 15px;
    margin-left: ${standardPadding}px;
    margin-bottom: ${standardPadding}px;
    margin-top: ${standardPadding}px;
`;

export default InputField;
