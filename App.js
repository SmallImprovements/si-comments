import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import registerForPushNotificationsAsync from './services/push-notifications';
import auth from './services/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default class App extends React.Component {
    state = {
        assetsAreLoaded: false,
        loggedIn: false,
    };

    componentWillMount() {
        this._loadAssetsAsync();
        auth.tryLoginFromCache().then(this.setState({ loggedIn: true })).catch(err => {
            console.log(err);
        });
        /* This should be uncommented once the backend can properly receive and store a Device token
            registerForPushNotificationsAsync();
        */
    }

    render() {
        if (!this.state.assetsAreLoaded && !this.state.loggedIn && !this.props.skipLoadingScreen) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                    <RootNavigation />
                </View>
            );
        }
    }

    async _loadAssetsAsync() {
        try {
            await Promise.all([
                Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
                Font.loadAsync([
                    // This is the font that we are using for our tab bar
                    Ionicons.font,
                    // We include SpaceMono because we use it in HomeScreen.js. Feel free
                    // to remove this if you are not using it in your app
                    { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
                ]),
            ]);
        } catch (e) {
            // In this case, you might want to report the error to your error
            // reporting service, for example Sentry
            console.warn(
                'There was an error caching assets (see: App.js), perhaps due to a ' +
                    'network timeout, so we skipped caching. Reload the app to try again.'
            );
            console.log(e);
        } finally {
            this.setState({ assetsAreLoaded: true });
        }
    }
}

// function mockPushNotification() {
//     return fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'Accept-Encoding': 'application/json',
//         },
//         body: JSON.stringify(fromMock),
//     }).then(res => {
//         console.log(res);
//     });
// }

/* 
    Mock data from the body of a request
    to: the push token of the device who should receive it
    title: the title content of a native iOS push notification
    body: the body content of a native iOS push notification
    sound: ....
    data: this content is what the app itself can read /receive.
          yes it seems weird that it's duplicated from the 
          body/title above, but not sure why...
          i suppose it doesn't have to be body/title, it could 
          be what ever edata we want to send like URL etc.
*/
// const fromMock = {
//     to: 'ExponentPushToken[xDf15uL4vznPUtwAxAn0cB]',
//     title: 'iOS native Notification Title',
//     body: 'The body of a native iOS notification',
//     sound: 'default',
//     data: { title: 'The title of an in-app notification', body: 'The body of an in-app notification' },
// };
