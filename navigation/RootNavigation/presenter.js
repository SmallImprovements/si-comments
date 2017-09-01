import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from '../MainTabNavigator';
import LoginScreen from '../../screens/LoginScreen';

function RootStackNavigator({ currentUser }) {
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
    const screenProps = { currentUser };
    /* eslint-disable new-cap */
    const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
    /* eslint-enable new-cap */
    return <CustomNavigator screenProps={screenProps} currentUser={currentUser} />;
}

export default function RootNavigator({ currentUser }) {
    return <RootStackNavigator currentUser={currentUser} />;
}
