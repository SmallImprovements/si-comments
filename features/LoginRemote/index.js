import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Linking, Image } from 'react-native';
import StyledInput from '../../components/StyledInput';
import { HeaderOne } from '../../components/Text';
import auth from '../../services/auth';
import siLogo from '../../assets/icons/app-icon.png';

// Example taken from https://github.com/expo/auth0-example/blob/master/main.js
let redirectUri;
if (Expo.Constants.manifest.xde) {
	// Hi there, dear reader!
	// This value needs to be the tunnel url for your local Expo project.
	// It also needs to be listed in valid callback urls of your Auth0 Client
	// Settings. See the README for more information.
	redirectUri = 'exp://w8-i3v.lucastobrazil.si-comments.exp.direct/+/redirect';
} else {
	redirectUri = `${Expo.Constants.linkingUri}/+/redirect`;
}
const SIClientId = 'pdnNOE8axmLRPk6opnr6pSbIxmFJxAlA';
// const SIDomain = 'https://www.small-improvements.com';
// const SIDomain = 'http://192.168.1.25:8080';
const SIDomain = 'http://192.168.2.104:8080';

export default class LoginRemote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingIn: false,
		};
		this.logUserIn = this.logUserIn.bind(this);
	}

	componentDidMount() {
		Linking.addEventListener('url', this.handleAuth0Redirect);
	}
	logUserIn() {
		const { code } = this.state;

		this.setState({ isLoggingIn: true });

		auth.login(code).catch(err => {
			const { message } = err;
			this.setState({ isLoggingIn: false });
			this.showErrorAlert(message);
		});
	}

	showErrorAlert(message) {
		Alert.alert(
			"Can't Log In",
			`Either your email address or password is incorrect. ${message}`,
			[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
			{ cancelable: true }
		);
	}

	getRandomState() {
		var randomNumbers = new Uint32Array(1);
		// window.crypto.getRandomValues(randomNumbers);
		// return encodeURIComponent(randomNumbers.join());
		return encodeURIComponent(12827329817392187398374293847);
	}

	loginWithSIAuth = async () => {
		const redirectionURL =
			`${SIDomain}/external-services/authorize/gmail` +
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
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					height: '100%',
				}}
			>
				{isLoggingIn
					? <View>
							<ActivityIndicator />
							<Text style={{ textAlign: 'center', marginTop: 20 }}>Logging In...</Text>
						</View>
					: <View>
							<Image
								style={{ width: 90, height: 90, marginLeft: 'auto', marginRight: 'auto' }}
								source={siLogo}
							/>
							<Text style={{ textAlign: 'center', marginTop: 20 }}>
								To continue, please sign in with Small Improvements
							</Text>
							<Button onPress={this.loginWithSIAuth} title="Sign in..." />
						</View>}
			</View>
		);
	}
}
