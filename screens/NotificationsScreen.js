import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NotificationItem } from "../components/NotificationItem";
import { notificationsLog } from "../api/mockData.js";

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: "Notifications"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {notificationsLog.map(item =>
          <NotificationItem key={item.id} text={item.type} />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
