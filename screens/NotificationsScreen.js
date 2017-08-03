import React from "react";
import { View, Button, ScrollView, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackNavigator } from "react-navigation";
import Comment from "../components/Comment";
import EntityPreview from "../components/EntityPreview";
import { mockComments, mockObjective } from "../api/mockData";
import { NotificationItem } from "../components/NotificationItem";
import { notificationsLog } from "../api/mockData.js";
import styled from "styled-components/native";
import styleVars from "../assets/styles/vars";
import CommentInput from "../components/CommentInput";

const { standardPadding } = styleVars;

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

const PostCommentContainer = styled.View`flex-grow: 0;`;

const CommentOverview = ({ navigation }) =>
  <KeyboardAwareScrollView
    navigation={navigation}
    contentContainerStyle={{
      flex: 1,
      flexDirection: "column"
    }}
  >
    <ScrollView style={{ flex: 1 }}>
      <EntityPreview type="OBJECTIVE" entity={mockObjective} />
      <Text>
        {navigation.state.params.notification_id}
      </Text>
      {mockComments.map(comment => <Comment {...comment} key={comment.id} />)}
    </ScrollView>
    <PostCommentContainer>
      <CommentInput />
    </PostCommentContainer>
  </KeyboardAwareScrollView>;

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
