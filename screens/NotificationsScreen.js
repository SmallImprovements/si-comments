import React from 'react';
import { StackNavigator } from 'react-navigation';

import EntityCommentView from '../features/EntityCommentView';
import NotificationsList from '../features/NotificationsList';

const NotificationsScreen = StackNavigator({
	NotificationsList: {
		screen: NotificationsList,
	},
	EntityCommentView: {
		screen: EntityCommentView,
	},
});

NotificationsScreen.navigationOptions = {
	header: null,
};

export default NotificationsScreen;
