import React from 'react';
import { StackNavigator } from 'react-navigation';

import CommentsList from '../features/CommentsList';
import NotificationsList from '../features/NotificationsList';

const NotificationsScreen = StackNavigator({
    NotificationsList: {
        screen: NotificationsList,
    },
    CommentsList: {
        screen: CommentsList,
    },
});

NotificationsScreen.navigationOptions = {
    header: null,
};

export default NotificationsScreen;
