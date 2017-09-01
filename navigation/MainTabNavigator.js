import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import colors from '../assets/styles/colours';

import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const { SIBlue, SIGray4 } = colors;
export default TabNavigator(
    {
        Notifications: {
            screen: NotificationsScreen,
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        navigationOptions: ({ navigation }) => {
            return {
                tabBarIcon: ({ focused }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    switch (routeName) {
                        case 'Notifications':
                            iconName =
                                Platform.OS === 'ios'
                                    ? `ios-notifications${focused ? '' : '-outline'}`
                                    : 'md-notifications-none';
                            break;
                        case 'Settings':
                            iconName = Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-options';
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            size={28}
                            style={{ marginBottom: -3 }}
                            color={focused ? SIBlue : SIGray4}
                        />
                    );
                },
            };
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: true,
        initialRouteName: 'Notifications',
        tabBarOptions: {
            style: {
                borderTopColor: SIGray4,
                borderTopWidth: 1,
            },
        },
    }
);
