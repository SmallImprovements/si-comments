import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Linking, Image } from 'react-native';
import auth from '../../services/auth';
import siLogo from '../../assets/icons/app-icon.png';
import { BASE_URL, DEV_IP } from '../../services/auth/factory';
import { HeaderOne } from '../../components/Header';
import registerForPushNotificationsAsync from '../../services/push-notifications';
import StyledButton from '../../components/Button';

import Logo from './styled/Logo';
import LoginHeaderText from './styled/LoginHeaderText';
import LoginSubHeaderText from './styled/LoginSubHeaderText';
import Container from './styled/Container';
import LoginText from './styled/LoginText';
import Illustration from './styled/Illustration';

// Example taken from https://github.com/expo/auth0-example/blob/master/main.js
const IS_DEV = process.env.NODE_ENV === 'development';
let redirectUri;
if (Expo.Constants.manifest.xde) {
    redirectUri = `exp://${DEV_IP}:19000/+/redirect`;
} else {
    redirectUri = `${Expo.Constants.linkingUri}/+/redirect`;
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: true,
            loginError: null,
        };
    }

    componentDidMount() {
        Linking.addEventListener('url', this.handleAuth0Redirect);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleAuth0Redirect);
    }

    componentWillMount() {
        this.setState({ isLoggingIn: true });
        auth
            .tryLoginFromCache()
            .then(res => {
                if (!res) {
                    this.setState({
                        isLoggingIn: false,
                    });
                }
            })
            .catch(err => {
                const newState = {
                    isLoggingIn: false,
                    loginError: err.response.data.error_description || 'Unknown error',
                };
                this.setState(newState);
            });
    }

    logUserIn = () => {
        const { code } = this.state;
        this.setState({ isLoggingIn: true });
        console.log('Code recieved was---> ', code);
        auth
            .login(code)
            .then(
                res => res,
                err => {
                    this.setState({ isLoggingIn: false });
                    // Most likely this fails because you've got a stored code that the server rejected
                    this.showErrorAlert(err || 'Unknown error');
                }
            )
            .then(registerForPushNotificationsAsync);
    };

    showErrorAlert = message => {
        Alert.alert("Can't Log In", `${message}`, [{ text: 'OK', onPress: auth.clearAllFromLocalDB }], {
            cancelable: true,
        });
    };

    getRandomState = () => {
        // var randomNumbers = new Uint32Array(1);
        // window.crypto.getRandomValues(randomNumbers);
        // return encodeURIComponent(randomNumbers.join());
        return encodeURIComponent(12827329817392187398374293847);
    };

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

    toQueryString = params => {
        return (
            '?' +
            Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&')
        );
    };

    render() {
        const { isLoggingIn, loginError } = this.state;
        return (
            <Container>
                {isLoggingIn ? (
                    <LoggingIn />
                ) : (
                    <LogInView onPressLogin={this.loginWithSIAuth} loginError={loginError} />
                )}
            </Container>
        );
    }
}

function LoggingIn() {
    return (
        <View>
            <ActivityIndicator />
            <LoginText>Logging In...</LoginText>
        </View>
    );
}

function LogInView({ loginError, onPressLogin }) {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View style={{ flexGrow: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Logo source={siLogo} />
                <LoginHeaderText>Live Comments</LoginHeaderText>
                <LoginSubHeaderText>To continue, please sign in with Small Improvements</LoginSubHeaderText>
                <View style={{ width: 'auto' }}>
                    <StyledButton onPress={onPressLogin} title="Sign in" />
                </View>
                {IS_DEV && <Button onPress={auth.clearAllFromLocalDB} title="Clear DB" />}
                {loginError && <LoginText>{loginError}</LoginText>}
            </View>
            <Illustration resizeMode="contain" source={require('../../assets/images/login_background.png')} />
        </View>
    );
}
