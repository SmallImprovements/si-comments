import React from "react";
import { ScrollView } from "react-native";
import { NotificationItem } from "../../components/NotificationItem";
import { notificationsLog } from "../../api/mockData.js";

export default function NotificationsList({ navigation }) {
  return (
    <ScrollView navigation={navigation} style={{ backgroundColor: "#fff" }}>
      {notificationsLog.map(item =>
        <NotificationItem
          key={item.id}
          text={item.type}
          onSelect={() => {
            navigation.navigate("CommentsList", {
              notification_id: item.entityId
            });
          }}
        />
      )}
    </ScrollView>
  );
}

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
  return {
    title: "Notifications"
  };
};
