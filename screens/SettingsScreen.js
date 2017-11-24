import React from 'react';
import { View, Text, Button, AsyncStorage, Alert } from 'react-native';
import auth from '../services/auth';
import Avatar from '../components/Avatar';
import { HeaderOne } from '../components/Text';
import colorVars from '../assets/styles/colours';
import styleVars from '../assets/styles/vars';
import registerForPushNotificationsAsync from '../services/push-notifications';

const { SIMainRed, SIGray2 } = colorVars;
const { navigationBorderColor } = styleVars;
const IS_DEV = process.env.NODE_ENV === 'development';
export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Account',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: navigationBorderColor,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            deviceId: null,
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('deviceId')
            .then(value => {
                this.setState({ deviceId: value });
            }, err => err)
            .done();
    }

    confirmDeleteDevice = () => {
        Alert.alert('Please confirm', "This app won't really work if you stop recieving push notifications", [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ,
            { text: 'Confirm', onPress: this.deleteDeviceId },
        ]);
    };

    deleteDeviceId = () => {
        auth.deleteDeviceId().then(res => {
            this.setState({ deviceId: null });
        });
    };

    render() {
        const { currentUser } = this.props.screenProps;
        const { name, logo, email } = currentUser;
        const { deviceId } = this.state;

        const logout = () => auth.logout();

        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ flexGrow: 1, marginTop: 50, alignItems: 'center' }}>
                    <Avatar logoUrl={logo} avatarSize={80} />
                    <HeaderOne style={{ marginTop: 10 }}>{name}</HeaderOne>
                    <Text style={{ marginTop: 10, color: SIGray2 }}>{email}</Text>
                    <Text style={{ marginTop: 10, color: SIGray2 }}>
                        {deviceId ? deviceId : 'Push notifications not enabled, perhaps you did not allow them?'}
                    </Text>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Button color={SIMainRed} title="Logout" onPress={logout} />
                    {deviceId && (
                        <Button
                            color={SIMainRed}
                            title="Stop recieving push notifications"
                            onPress={this.confirmDeleteDevice}
                        />
                    )}
                    {IS_DEV && <Button title="Clear all Local Storage" onPress={auth.clearAllFromLocalDB} />}
                </View>
            </View>
        );
    }
}
