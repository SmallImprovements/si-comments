import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Text, Button } from 'react-native';
import auth from '../services/auth';
import Avatar from '../components/Avatar';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Account',
    };

    constructor(props) {
        super(props);
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
        console.log(this.props);
        const { currentUser } = this.props.screenProps;
        const { name, logo } = currentUser;
        const logout = () => auth.logout();
        return (
            <View>
                <Text>
                    Logged in as{' '}
                    <Text>
                        <Avatar logoUrl={logo} />
                        {name}
                    </Text>
                </Text>
                <Button title="Logout" onPress={logout} />
                <ExpoConfigView />
            </View>
        );
    }
}
