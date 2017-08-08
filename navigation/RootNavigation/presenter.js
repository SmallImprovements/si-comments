import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import MainTabNavigator from "../MainTabNavigator";
import LoginScreen from "../../screens/LoginScreen";
// import withCurrentUser from "../services/hoc/withCurrentUser";

const RootStackNavigator = ({ initialRouteName, screenProps }) => {
  const stackNavigatorConfigs = {
    initialRouteName,
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal"
      }
    })
  };

  const routeConfigs = {
    Main: {
      screen: MainTabNavigator
    },
    Login: {
      screen: LoginScreen
    }
  };
  const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
  return <CustomNavigator screenProps={screenProps} />;
};

export default function RootNavigator({ currentUser, screenProps }) {
  console.log(currentUser);
  const initialRouteName = currentUser ? "Main" : "Login";
  return (
    <RootStackNavigator
      screenProps={screenProps}
      initialRouteName={initialRouteName}
    />
  );
}
