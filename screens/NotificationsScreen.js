import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native';
import EntityCommentView from '../features/EntityCommentView';
import NotificationsList from '../features/NotificationsList';
import SettingsScreen from '../screens/SettingsScreen';
/* eslint-disable new-cap */
const NotificationsScreen = StackNavigator({
    NotificationsList: {
        screen: NotificationsList,
    },
    EntityCommentView: {
        screen: EntityCommentView,
    },
    Settings: {
        screen: SettingsScreen,
    },
});
/* eslint-enable new-cap */

NotificationsScreen.navigationOptions = {
    header: null,
};

export default NotificationsScreen;
