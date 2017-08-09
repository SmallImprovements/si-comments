import React from 'react';
import { withData } from 'ladda-react';
import NotificationsList from './presenter';
import { getNotifications } from '../../services/api';

export default withData({
	resolve: {
		notifications: getNotifications(),
	},
})(NotificationsList);
