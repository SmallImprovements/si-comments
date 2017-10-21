import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Linking, Image } from 'react-native';
import auth from '../../services/auth';
import siLogo from '../../assets/icons/app-icon.png';
import { BASE_URL } from '../../services/auth/factory';
import { HeaderOne, HeaderTwo } from '../../components/Text';
import styled from 'styled-components/native';
import colorVars from '../../assets/styles/colours';
import registerForPushNotificationsAsync from '../../services/push-notifications';

const { SIBlack } = colorVars;
const LoginHeaderText = styled(HeaderTwo)`
    color: ${SIBlack};
`;
// Example taken from https://github.com/expo/auth0-example/blob/master/main.js
// const IS_DEV = !process.env.NODE_ENV === 'development';
let redirectUri;
if (Expo.Constants.manifest.xde) {
    // Hi there, dear reader!
    // This value needs to be the tunnel url for your local Expo project.
    // It also needs to be listed in valid callback urls of your Auth0 Client
    // Settings. See the README for more information.
    redirectUri = 'exp://192.168.2.100:19000/+/redirect';
    // redirectUri = 'exp://localhost:19000/+/redirect';
    // redirectUri = 'exp://localhost:19000/+/redirect';
} else {
    redirectUri = `${Expo.Constants.linkingUri}/+/redirect`;
}
// const SIClientId = 'pdnNOE8axmLRPk6opnr6pSbIxmFJxAlA';
// const SIDomain = 'https://www.small-improvements.com';
// const SIDomain = 'http://192.168.1.25:8080';
// const SIDomain = 'http://192.168.2.104:8080';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
        };
        this.logUserIn = this.logUserIn.bind(this);
        this.showErrorAlert = this.showErrorAlert.bind(this);
    }

    componentDidMount() {
        Linking.addEventListener('url', this.handleAuth0Redirect);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleAuth0Redirect);
    }

    logUserIn() {
        const { code } = this.state;
        console.log('caled logUserIn', code);

        this.setState({ isLoggingIn: true });

        auth
            .login(code)
            .then(
                res => res,
                err => {
                    const { message } = err;
                    this.setState({ isLoggingIn: false });
                    this.showErrorAlert(message);
                }
            )
            .then(registerForPushNotificationsAsync);
    }

    showErrorAlert(message) {
        /* eslint-disable no-console */
        Alert.alert(
            "Can't Log In",
            `Either your email address or password is incorrect. ${message}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
        );
        /* eslint-enable no-console */
    }

    getRandomState() {
        // var randomNumbers = new Uint32Array(1);
        // window.crypto.getRandomValues(randomNumbers);
        // return encodeURIComponent(randomNumbers.join());
        return encodeURIComponent(12827329817392187398374293847);
    }

    loginWithSIAuth = async () => {
        const redirectionURL =
            `${BASE_URL}/external-services/authorize/gmail` +
            this.toQueryString({
                state: this.getRandomState(),
                redirect_uri: redirectUri,
            });
        Expo.WebBrowser.openBrowserAsync(redirectionURL);
    };

    handleAuth0Redirect = async event => {
        if (!event.url.includes('+/redirect')) {
            return;
        }
        Expo.WebBrowser.dismissBrowser();
        const [, queryString] = event.url.split('?');
        const responseObj = queryString.split('&').reduce((map, pair) => {
            const [key, value] = pair.split('=');
            map[key] = value; // eslint-disable-line
            return map;
        }, {});
        const code = responseObj.code;
        this.setState({ code });
        this.logUserIn();
    };

    /**
   * Converts an object to a query string.
   */
    toQueryString(params) {
        return (
            '?' +
            Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&')
        );
    }

    render() {
        const { isLoggingIn } = this.state;
        return (
            <View style={{ height: '100%', backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                {isLoggingIn ? (
                    <View>
                        <ActivityIndicator />
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Logging In...</Text>
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <View style={{ flexGrow: 1, flex: 1, justifyContent: 'center' }}>
                            <HeaderOne style={{ textAlign: 'center', marginBottom: 20 }}>SI Comments</HeaderOne>
                            <Image
                                style={{ width: 60, height: 60, marginLeft: 'auto', marginRight: 'auto' }}
                                source={siLogo}
                            />
                            <LoginHeaderText style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                                To continue, please sign in with Small Improvements
                            </LoginHeaderText>
                            <Button onPress={this.loginWithSIAuth} title="Sign in..." />
                            <Button onPress={auth.clearAllFromLocalDB} title="Clera DB" />
                        </View>
                        <Image
                            resizeMode="contain"
                            style={{
                                width: '100%',
                                height: 200,
                            }}
                            source={require('../../assets/images/login_background.png')}
                        />
                    </View>
                )}
            </View>
        );
    }
}
