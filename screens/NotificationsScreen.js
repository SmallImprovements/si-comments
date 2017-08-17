import { StackNavigator } from 'react-navigation';

import EntityCommentView from '../features/EntityCommentView';
import NotificationsList from '../features/NotificationsList';
/* eslint-disable new-cap */
const NotificationsScreen = StackNavigator({
	NotificationsList: {
		screen: NotificationsList,
	},
	EntityCommentView: {
		screen: EntityCommentView,
	},
});
/* eslint-enable new-cap */

NotificationsScreen.navigationOptions = {
	header: null,
};

export default NotificationsScreen;
