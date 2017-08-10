import React from 'react';
import { withData } from 'ladda-react';
import NotificationsList from './presenter';
import { getNotifications } from '../../services/api';
import { ActivityIndicator } from 'react-native';

export default withData({
  resolve: {
    notifications: () => getNotifications(),
  },
  pendingComponent: () => <ActivityIndicator />,
})(NotificationsList);
