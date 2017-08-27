import { forEach } from 'lodash/fp';
import { AsyncStorage } from 'react-native';

const IS_DEV = process.env.NODE_ENV === 'development';
export const BASE_URL = IS_DEV ? 'http://192.168.2.104:8080' : 'http://www.small-improvements.com';

export default function auth(http) {
    const state = {
        user: null,
        tokenProvider: {
            requestToken: code =>
                http
                    .post(
                        `/api/external-services/token?code=${code}`,
                        {},
                        {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        }
                    )
                    .then(res => {
                        if (!res.data.access_token) {
                            throw new Error('Failed at requestToken');
                        }
                        return res.data.access_token;
                    }),
            getStoredToken: () => AsyncStorage.getItem('userToken').then(token => token).catch(err => err),
            removeToken: () => removeTokenFromLocalDB(),
        },
        replacements: {},
    };

    function storeTokenInLocalDB(token) {
        // @todo why is this getting called 3 times after logging in?
        // console.log('storeTokenInLocalDB', token);
        if (!token) {
            return;
        }
        AsyncStorage.setItem('userToken', token);
        return token;
    }

    function removeTokenFromLocalDB() {
        AsyncStorage.setItem('userToken', '').done();
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
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.getStoredToken) {
            throw new Error('No valid tokenProvider specified');
        }
        // AsyncStorage.getItem('userToken').then(res => {
        //     console.log(res);
        // });
        return tokenProvider.getStoredToken().then(loginWithToken).catch(err => err);
    }

    function login(code) {
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.requestToken) {
            throw new Error('No valid tokenProvider specified');
        }
        return tokenProvider.requestToken(code).then(storeTokenInLocalDB).then(loginWithToken);
    }

    function logout() {
        const { tokenProvider } = state;

        setUser(null);
        setReplacements({});
        setAuthorizationHeader(null);
        notifyAuthChangeListeners();

        if (!tokenProvider || !tokenProvider.removeToken) {
            throw new Error('No valid tokenProvider specified');
        }
        return tokenProvider.removeToken();
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
    };
}
