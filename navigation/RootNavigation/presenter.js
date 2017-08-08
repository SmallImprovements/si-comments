import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from '../MainTabNavigator';
import LoginScreen from '../../screens/LoginScreen';

function RootStackNavigator({ initialRouteName, screenProps, currentUser }) {
    const stackNavigatorConfigs = {
        initialRouteName: currentUser ? 'Main' : 'Login',
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        }),
        headerMode: currentUser ? 'screen' : 'none',
    };

    const routeConfigs = {
        Main: {
            screen: MainTabNavigator,
        },
        Login: {
            screen: LoginScreen,
        },
    };
    const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
    return <CustomNavigator screenProps={screenProps} />;
}

export default function RootNavigator({ currentUser, screenProps }) {
    return <RootStackNavigator screenProps={screenProps} currentUser={currentUser} />;
}
