import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';
import DateDisplay from '../../DateDisplay';
const { subduedTextColor } = styleVars;

export default (CommentDate = styled(DateDisplay)`
    color: ${subduedTextColor};
`);
