import { forEach } from 'lodash/fp';

const IS_REMOTE_TESTING = true;
const BASE_URL = IS_REMOTE_TESTING ? 'http://192.168.1.25:8080' : 'http://localhost:8080';

export default function auth(http) {
    const state = {
        user: null,
        tokenProvider: {
            requestToken: () =>
                http
                    .get('/api/external-services/token-dev', {
                        params: { loginName: 'demo@example.com' },
                    })
                    .then(res => res.data.access_token),
            getStoredToken: () => Promise.resolve(null),
            removeToken: () => Promise.resolve(),
        },
        replacements: {},
    };

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
        setAuthorizationHeader(token);
        return http.get('/api/v2/users/me').then(res => {
            const user = res.data;
            if (!user) {
                throw new Error('Failed at LoginWithtoken');
            }

            setUser(user);
            notifyAuthChangeListeners();
            // console.log('loginWithToken', res);
            return { user, status: 'OK' };
            // return api.replacements
            //     .getGmailReplacements()
            //     .then(replacements => {
            //         setReplacements(replacements);
            //         notifyAuthChangeListeners();
            //         return { user, status: "OK" };
            //     });
        });
    }

    function tryLoginFromCache(email) {
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.getStoredToken) {
            throw new Error('No valid tokenProvider specified');
        }

        return tokenProvider.getStoredToken(email).then(token => {
            return token ? loginWithToken(token) : { user: null, status: 'OK' };
        });
    }

    function login(USER_EMAIL) {
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.requestToken) {
            throw new Error('No valid tokenProvider specified');
        }
        // @todo this shouldn't be set here
        http.defaults.baseURL = BASE_URL;
        return requestToken(USER_EMAIL).then(loginWithToken);
    }

    function requestToken(USER_EMAIL) {
        return http
            .get('/api/external-services/token-dev', {
                params: { loginName: USER_EMAIL },
            })
            .then(res => {
                return res.data.access_token;
            });
    }

    function logout() {
        const { tokenProvider, user } = state;

        setUser(null);
        setReplacements({});
        setAuthorizationHeader(null);
        notifyAuthChangeListeners();

        if (!tokenProvider || !tokenProvider.removeToken) {
            throw new Error('No valid tokenProvider specified');
        }
        return tokenProvider.removeToken(user.email);
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
