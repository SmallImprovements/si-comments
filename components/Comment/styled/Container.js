import styled from 'styled-components/native';
import styleVars from '../../../assets/styles/vars';

const { standardPadding, commentBorder, commentBackgroundColour } = styleVars;

export default (Container = styled.View`
    border-radius: 3px;
    margin-right: 10px;
    flex-direction: row;
    padding: ${standardPadding * 0.5}px;
    border: ${commentBorder};
    margin-top: -1px;
    background-color: ${commentBackgroundColour};
    width: 100%;
`);
