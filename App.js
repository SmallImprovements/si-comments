import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import auth from './services/auth';

export default class App extends React.Component {
    state = {
        assetsAreLoaded: false,
    };

    componentWillMount() {
        this._loadAssetsAsync();
    }

    render() {
        const { assetsAreLoaded } = this.state;
        if (!assetsAreLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                    }}
                >
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && (
                        <View
                            style={{
                                height: 24,
                                backgroundColor: 'rgba(0,0,0,0.2)',
                            }}
                        />
                    )}
                    <RootNavigation />
                </View>
            );
        }
    }

    async _loadAssetsAsync() {
        try {
            await Promise.all([
                // Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
                Font.loadAsync({
                    // This is the font that we are using for our tab bar
                    ...Ionicons.font,
                    // We include SpaceMono because we use it in HomeScreen.js. Feel free
                    // to remove this if you are not using it in your app
                    { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
                }),
            ]);
        } catch (e) {
            // In this case, you might want to report the error to your error
            // reporting service, for example Sentry
            /* eslint-disable no-console */
            console.warn(
                'There was an error caching assets (see: App.js), perhaps due to a ' +
                    'network timeout, so we skipped caching. Reload the app to try again.'
            );
            console.log(e);
            /* eslint-enable no-console */
        } finally {
            this.setState({ assetsAreLoaded: true });
        }
    }
}
