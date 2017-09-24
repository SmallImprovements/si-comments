import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import auth from '../services/auth';
import Avatar from '../components/Avatar';
import { HeaderOne } from '../components/Text';
import colorVars from '../assets/styles/colours';

const { SIMainRed, SIGray2 } = colorVars;
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
        const { name, logo, email } = currentUser;
        const { userToken } = this.state;
        const logout = () => auth.logout();
        const clearAllFromLocalDB = () => auth.clearAllFromLocalDB();
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ flexGrow: 1, marginTop: 50, alignItems: 'center' }}>
                    <Avatar logoUrl={logo} avatarSize={80} />
                    <HeaderOne style={{ marginTop: 10 }}>{name}</HeaderOne>
                    <Text style={{ marginTop: 10, color: SIGray2 }}>{email}</Text>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Button color={SIMainRed} title="Logout" onPress={logout} />
                    <Button title="Clear all Local Storage" onPress={clearAllFromLocalDB} />
                </View>
            </View>
        );
    }
}
