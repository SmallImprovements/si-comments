import React from 'react';
import { PropTypes } from 'react';
import { keys } from 'lodash/fp';
import styled from 'styled-components/native';

const ICON_BY_TYPE = {
	MESSAGE: require('./png/module-messages-icon.png'),
	PRAISE: require('./png/module-praise-icon.png'),
	OBJECTIVE: require('./png/module-objectives-icon.png'),
};

ModuleIcon.propTypes = {
	type: PropTypes.oneOf(keys(ICON_BY_TYPE)).isRequired,
};

const StyledImage = styled.Image`
	width: 15px;
	height: 15px;
	opacity: 0.4;
`;

export default function ModuleIcon({ type }) {
	const icon = ICON_BY_TYPE[type] || '';
	return <StyledImage source={icon} />;
}
