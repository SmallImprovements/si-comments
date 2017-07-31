import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import Comment from "../components/Comment";
import EntityPreview from "../components/EntityPreview";
import { mockComments, mockObjective } from "../api/mockData";

const CommentOverview = ({ navigation }) =>
  <ScrollView banner="Home Screen" navigation={navigation}>
    <EntityPreview type="OBJECTIVE" entity={mockObjective} />
    {mockComments.map(comment => <Comment {...comment} key={comment.id} />)}
    {/*<Button
      onPress={() => navigation.navigate("Detail", { name: "Jane" })}
      title="Do something"
    />*/}
  </ScrollView>;

CommentOverview.navigationOptions = ({ navigation, screenProps }) => {
  return {
    title: "Comment",
    headerRight: <Button title="Close" onPress={screenProps.onClose} />
  };
};
const CommentDetail = ({ navigation }) =>
  <ScrollView
    banner={`${navigation.state.params.mode === "edit"
      ? "Now Editing "
      : ""}${navigation.state.params.name}'s Profile`}
    navigation={navigation}
  />;

CommentDetail.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `${params.name}'s Profile!`,
    // Render a button on the right side of the header.
    // When pressed switches the screen to edit mode.
    headerRight: (
      <Button
        title={params.mode === "edit" ? "Done" : "Edit"}
        onPress={() =>
          setParams({ mode: params.mode === "edit" ? "" : "edit" })}
      />
    )
  };
};

const CommentScreen = StackNavigator(
  {
    Overview: {
      screen: CommentOverview
    },
    Detail: {
      screen: CommentDetail
    }
  },
  {
    headerMode: "screen"
  }
);

export default CommentScreen;
