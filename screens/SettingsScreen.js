import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Text, Button } from 'react-native';
import auth from '../services/auth';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Account',
    };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
        const logout = () => auth.logout();
        return (
            <View>
                <Text>Settings</Text>
                <Button title="Logout" onPress={logout} />
                <ExpoConfigView />
            </View>
        );
    }
}
