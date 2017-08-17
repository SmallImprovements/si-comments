import styled from 'styled-components/native';
import styleVars from '../assets/styles/vars';

const { standardPadding } = styleVars;

const StyledInput = styled.TextInput`  
	background: white;
	borderWidth: 1px
	borderColor: lightgray;
	padding: ${standardPadding}px;
`;

export default StyledInput;
