import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import Comment from "../components/Comment";
import EntityPreview from "../components/EntityPreview";
import { mockComments, mockObjective } from "../api/mockData";
import { NotificationItem } from "../components/NotificationItem";
import { notificationsLog } from "../api/mockData.js";

const NotificationsList = ({ navigation }) =>
  <ScrollView navigation={navigation} style={{ backgroundColor: "#fff" }}>
    {notificationsLog.map(item =>
      <NotificationItem
        key={item.id}
        text={item.type}
        onSelect={() => {
          navigation.navigate("CommentOverview", {
            notification_id: item.entityId
          });
        }}
      />
    )}
  </ScrollView>;

NotificationsList.navigationOptions = ({ navigation, screenProps }) => {
  return {
    title: "Notifications"
  };
};

const CommentOverview = ({ navigation }) =>
  <ScrollView banner="Home Screen" navigation={navigation}>
    <EntityPreview type="OBJECTIVE" entity={mockObjective} />
    <Text>
      {navigation.state.params.notification_id}
    </Text>
    {mockComments.map(comment => <Comment {...comment} key={comment.id} />)}
  </ScrollView>;

CommentOverview.navigationOptions = ({ navigation, screenProps }) => {
  return {
    title: "Comment"
  };
};

const CommentScreen = StackNavigator({
  NotificationsList: {
    screen: NotificationsList
  },
  CommentOverview: {
    screen: CommentOverview
  }
});

CommentScreen.navigationOptions = {
  header: null
};

export default CommentScreen;
