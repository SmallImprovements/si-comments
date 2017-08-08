import { forEach } from "lodash/fp";

/*
    Note to self:
    gernot basically explained that we use this 'state' internally,
    and we expose methods like getUser() that you can import and do http.getUser();

    So we want to keep using this state object inside it.

    Secondarily, we want to wrap our component with withCurrentUser(see GmailConversationSideBar). So that it's a hoc that provides the current user
    that will listen for changes
*/
const BASE_URL = "http://localhost:8080";
export default function auth(http) {
    const state = {
        user: null,
        tokenProvider: null,
        replacements: {}
    };

    const authChangeListeners = [];

    function getUser() {
        // return global.user;
        return state.user;
    }

    function setUser(user) {
        state.user = user;
        // global.user = user;
        // console.log(global.user);
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
        return http.get("/api/v2/users/me").then(
            res => {
                const user = res.data;
                console.log(user);
                setUser(user);
                return api.replacements
                    .getGmailReplacements()
                    .then(replacements => {
                        setReplacements(replacements);
                        notifyAuthChangeListeners();
                        return { user, status: "OK" };
                    });
            },
            err => ({ err, status: "ERROR" })
        );
    }

    function tryLoginFromCache(email) {
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.getStoredToken) {
            throw new Error("No valid tokenProvider specified");
        }

        return tokenProvider.getStoredToken(email).then(token => {
            return token ? loginWithToken(token) : { user: null, status: "OK" };
        });
    }

    function login(USER_EMAIL) {
        const { tokenProvider } = state;
        if (!tokenProvider || !tokenProvider.requestToken) {
            throw new Error("No valid tokenProvider specified");
        }
        http.defaults.baseURL = BASE_URL;

        return requestToken(USER_EMAIL)
            .then(loginWithToken)
            .catch(err => ({ err, status: "ERROR" }));

        return loginWithToken;
    }

    function requestToken(USER_EMAIL) {
        return http
            .get("/api/external-services/token-dev", {
                params: { loginName: USER_EMAIL }
            })
            .then(res => res.data.access_token);
    }

    function logout() {
        const { tokenProvider, user } = state;

        setUser(null);
        setReplacements({});
        setAuthorizationHeader(null);
        notifyAuthChangeListeners();

        if (!tokenProvider || !tokenProvider.removeToken) {
            throw new Error("No valid tokenProvider specified");
        }
        return tokenProvider.removeToken(user.email);
    }

    function isLoggedIn() {
        return !!global.user;
        // return !!state.user;
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
        forEach(
            listener => listener(getUser(), getReplacements()),
            authChangeListeners
        );
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
        useTokenProvider
    };
}
