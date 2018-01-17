import React from 'react';
import { PropTypes } from 'prop-types';
import { keys } from 'lodash/fp';
import IconImage from './styled';

const ICON_BY_TYPE = {
    MESSAGE: require('./png/module-messages-icon.png'),
    PRAISE: require('./png/module-praise-icon.png'),
    OBJECTIVE: require('./png/module-objectives-icon.png'),
};

ModuleIcon.propTypes = {
    type: PropTypes.oneOf(keys(ICON_BY_TYPE)).isRequired,
};

export default function ModuleIcon({ type }) {
    const icon = ICON_BY_TYPE[type] || '';
    return <IconImage source={icon} />;
}
