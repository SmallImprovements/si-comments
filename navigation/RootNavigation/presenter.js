import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from '../MainTabNavigator';
import LoginScreen from '../../screens/LoginScreen';

function RootStackNavigator({ screenProps, currentUser }) {
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
    /* eslint-disable new-cap */
    const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
    /* eslint-enable new-cap */
    return <CustomNavigator screenProps={screenProps} />;
}

export default function RootNavigator({ currentUser, screenProps }) {
    return <RootStackNavigator screenProps={screenProps} currentUser={currentUser} />;
}
