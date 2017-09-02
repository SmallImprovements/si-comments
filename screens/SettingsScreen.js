import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import { View, Text, Button, AsyncStorage } from 'react-native';
import auth from '../services/auth';
import Avatar from '../components/Avatar';
import { HeaderOne } from '../components/Text';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Account',
    };

    constructor(props) {
        super(props);
        this.state = {
            userToken: null,
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userToken')
            .then(value => {
                this.setState({ userToken: value });
            })
            .done();
    }

    render() {
        const { currentUser } = this.props.screenProps;
        const { name, logo } = currentUser;
        const { userToken } = this.state;
        const logout = () => auth.logout();
        const clearAllFromLocalDB = () => auth.clearAllFromLocalDB();
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <HeaderOne>
                    Logged in as{' '}
                    <Text>
                        <Avatar logoUrl={logo} />
                        {name}
                    </Text>
                </HeaderOne>
                <HeaderOne style={{ color: userToken ? 'black' : 'red' }}>
                    Token is {userToken || 'not set!'}
                </HeaderOne>
                <View>
                    <Button title="Logout" onPress={logout} />
                    <Button title="Clear all Local Storage" onPress={clearAllFromLocalDB} />
                </View>
            </View>
        );
    }
}
