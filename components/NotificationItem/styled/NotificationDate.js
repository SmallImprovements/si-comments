import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';
import DateDisplay from '../../DateDisplay';

const { standardPadding, subduedTextColor } = styleVars;

const NotificationDate = styled(DateDisplay)`
    margin-left: ${standardPadding * 0.25}px;
    color: ${subduedTextColor};
`;

const NotificationDateContainer = styled.View`
    margin-top: ${standardPadding * 0.125}px;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default NotificationDate;
export { NotificationDateContainer };
