import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NotificationItem } from '../../components/NotificationItem';
import { getNotifications } from '../../services/api';
import { filterNotifications } from '../../services/notifications';

export default function NotificationsList({ navigation, notifications }) {
    const filteredNotifications = filterNotifications(notifications);
    return (
        <ScrollView navigation={navigation} style={{ backgroundColor: '#fff' }}>
            {filteredNotifications.length
                ? filteredNotifications.map(item =>
                      <NotificationItem
                          key={item.id}
                          text={item.type}
                          onSelect={() => {
                              navigation.navigate('CommentsList', {
                                  notification_id: item.entityId,
                              });
                          }}
                      />
                  )
                : <Text>You have no Notifications</Text>}
        </ScrollView>
    );
}

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
    return {
        title: 'Notifications',
    };
};
