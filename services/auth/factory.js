import { forEach } from 'lodash/fp';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

const IS_DEV = process.env.NODE_ENV === 'development';
// export const BASE_URL = IS_DEV ? 'http://192.168.2.104:8080' : 'http://www.small-improvements.com';
export const BASE_URL = IS_DEV
    ? 'http://192.168.2.102:8080'
    : 'https://sandbox-team-green-dot-small-improvements-hrd.appspot.com';

export default function auth(http) {
    const state = {
        user: null,
        replacements: {},
    };

    function requestToken(code) {
        return http
            .post(
                `/api/external-services/token?code=${code}`,
                {},
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            )
            .then(
                res => {
                    console.log('RequestToken resolved', res.data);
                    if (!res.data.access_token) {
                        return Promise.reject('No token');
                    }
                    return res.data.access_token;
                },
                err => {
                    console.log('Error at requestToken', err);
                    return err;
                }
            );
    }

    function getStoredTokenFromDB() {
        return AsyncStorage.getItem('userToken').then(
            token => {
                if (!token) {
                    return console.log('no token found!');
                }
                return token;
            },
            err => Promise.reject('getStoredTokenFromDB fail', err)
        );
    }
    function storeTokenInLocalDB(token) {
        // @todo why is this getting called 3 times after logging in?
        console.log('storeTokenInLocalDB', token);
        if (!token) {
            return;
        }
        AsyncStorage.setItem('userToken', token).done();
        return token;
    }

    function removeTokenFromLocalDB() {
        console.log('removeTokenFromLocalDB');
        AsyncStorage.removeItem('userToken').done();
    }
    /* THIS IS JUST FOR DEBUGGING */
    function clearAllFromLocalDB() {
        console.log('clearAllFromLocalDB');
        AsyncStorage.clear().then(res => {
            console.log('Cleared');
            return res;
        });
    }

    const authChangeListeners = [];

    function getUser() {
        return state.user;
    }

    function setUser(user) {
        state.user = user;
        return user;
    }

    function getReplacements() {
        return state.replacements;
    }

    function setReplacements(replacements) {
        state.replacements = replacements;
        return replacements;
    }

    function useTokenProvider(tokenProvider) {
        state.tokenProvider = tokenProvider;
    }

    function loginWithToken(token) {
        http.defaults.baseURL = BASE_URL;
        console.log('loginWithToken', token);
        if (!token) {
            return;
        }
        setAuthorizationHeader(token);
        return http.get('/api/v2/users/me').then(res => {
            const user = res.data;
            if (!user) {
                throw new Error('No user object received');
            }
            setUser(user);
            return getGmailReplacements().then(replacements => {
                setReplacements(replacements);
                notifyAuthChangeListeners();
                return { user, status: 'OK' };
            });
        }, err => err);
    }

    function getGmailReplacements() {
        return http.get('/api/v2/gmail/app/replacements').then(
            res => res.data,
            err => {
                return { err: err };
            }
        );
    }

    function tryLoginFromCache() {
        // const { tokenProvider } = state;
        // if (!tokenProvider || !tokenProvider.getStoredToken) {
        //     throw new Error('No valid tokenProvider specified');
        // }
        return getStoredTokenFromDB()
            .then(loginWithToken, err => err)
            .catch(err => err);
    }

    function login(code) {
        // const { tokenProvider } = state;
        // if (!tokenProvider || !tokenProvider.requestToken) {
        //     throw new Error('No valid tokenProvider specified');
        // }

        if (!code) {
            throw new Error('No valid code provided');
        }

        console.log('login', code);

        return requestToken(code)
            .then(storeTokenInLocalDB, err => {
                console.log('argh!', err);
                return err;
            })
            .then(loginWithToken, err => {
                console.log('argh!', err);
                return err;
            })
            .catch(err => err);
    }

    function logout() {
        // const { tokenProvider } = state;

        setUser(null);
        setReplacements({});
        deleteDeviceId();
        setAuthorizationHeader(null);
        notifyAuthChangeListeners();

        // if (!tokenProvider || !tokenProvider.removeToken) {
        //     throw new Error('No valid tokenProvider specified');
        // }
        return removeTokenFromLocalDB();
    }

    function isLoggedIn() {
        return !!state.user;
    }

    function onAuthChange(cb) {
        authChangeListeners.push(cb);
        return () => {
            const i = authChangeListeners.indexOf(cb);
            if (i !== -1) {
                authChangeListeners.splice(i, 1);
            }
        };
    }

    function notifyAuthChangeListeners() {
        forEach(listener => listener(getUser(), getReplacements()), authChangeListeners);
    }

    function setAuthorizationHeader(token) {
        const bearer = token ? `Bearer ${token}` : null;
        http.defaults.headers.common.Authorization = bearer;
    }

    function registerDeviceId(deviceId) {
        // this is called as part of the getExpoPushTokenAsync flow, which gives the deviceId
        console.log('Device Push Notification Token: ', deviceId);
        return http
            .post(`/api/v2/mobile-app/register-device/${deviceId}`, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .then(res => res, err => err);
    }

    function deleteDeviceId() {
        // here we just get it from the device then tell the server to delete
        return Notifications.getExpoPushTokenAsync().then(res => {
            http
                .delete(`/api/v2/mobile-app/register-device/${res}`, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
                .then(res => res, err => err);
        });
    }

    return {
        tryLoginFromCache,
        login,
        logout,
        isLoggedIn,
        getUser,
        getReplacements,
        setUser,
        onAuthChange,
        useTokenProvider,
        clearAllFromLocalDB,
        registerDeviceId,
    };
}
