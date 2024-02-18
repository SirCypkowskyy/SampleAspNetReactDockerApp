import {User} from "@/types/global";
import {create} from "zustand";
import {removeAuthToken, removeRefreshToken, setAuthToken, setRefreshToken} from "@/lib/utils.ts";

/**
 * @AuthState is an interface that defines the state of the AuthStore.
 * @accessToken: The access token used to authenticate requests to the server.
 * @refreshToken: The refresh token used to get a new access token when the current one expires.
 * @user: The user object that represents the currently authenticated user.
 * @loginStatus: The status of the login process. Can be 'authenticated', 'unauthenticated', or 'pending'.
 *             'authenticated' means the user is authenticated and can access protected resources.
 *             'unauthenticated' means the user is not authenticated and cannot access protected resources.
 *             'pending' means the login process is in progress.
 */
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    loginStatus: 'authenticated' | 'unauthenticated' | 'pending';
}

/**
 * AuthActions is an interface that defines the actions that can be performed on the AuthStore.
 * @setTokens: A function that sets the access token and refresh token in the store.
 * @clearTokens: A function that clears the access token and refresh token from the store.
 * @setUser: A function that sets the user object in the store.
 * @clearUser: A function that clears the user object from the store.
 * @setLoginStatus: A function that sets the login status in the store.
 * @login: A function that performs the login process using the given username and password.
 * @signIn: A function that performs the sign in process using the given token.
 * @logout: A function that logs out the user by clearing the tokens and user object from the store.
 * @hydrate: A function that hydrates the store by checking if the user is already authenticated and setting the login status accordingly.
 *         This is useful for persisting the authentication state across page refreshes.
 *         It should be called once when the app is initialized to check if the user is already authenticated.
 */
interface AuthActions {
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoginStatus: (status: 'authenticated' | 'unauthenticated' | 'pending') => void;
    login: (username: string, password: string) => Promise<void>;
    signIn: (token : string) => Promise<void>;
    logout: () => void;
    hydrate: () => Promise<void>;
}

/**
 * AuthStore is a type that represents the AuthStore.
 * It is a combination of AuthState and AuthActions.
 */
type AuthStore = AuthState & AuthActions;

/**
 * useAuthStore is a hook that creates and returns the AuthStore.
 * It uses the create function from zustand to create the store.
 */
const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    loginStatus: 'pending',
    setTokens: (accessToken, refreshToken) => set({accessToken, refreshToken}),
    clearTokens: () => set({accessToken: null, refreshToken: null}),
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
    setLoginStatus: (status) => set({loginStatus: status}),
    login: async (username, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        
        if(response.ok) {
            const {accessToken, refreshToken} = await response.json();
            get().setTokens(accessToken, refreshToken);
            setAuthToken(accessToken);
            setRefreshToken(refreshToken);
            get().setLoginStatus('authenticated');
        } else {
            get().setLoginStatus('unauthenticated');
        }
    },
    signIn: async (token) => {
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });
        
        if(response.ok) {
            const {accessToken, refreshToken} = await response.json();
            get().setTokens(accessToken, refreshToken);
            setAuthToken(accessToken);
            setRefreshToken(refreshToken);
            get().setLoginStatus('authenticated');
        } else {
            const refreshToken = localStorage.getItem('refreshToken');
            if(refreshToken === null) {
                get().setLoginStatus('unauthenticated');
                return;
            }
            
            const response = await fetch('/api/refresh', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${refreshToken}`}
            });
            
            if(response.ok) {
                const {accessToken, refreshToken} = await response.json();
                get().setTokens(accessToken, refreshToken);
                setAuthToken(accessToken);
                setRefreshToken(refreshToken);
                get().setLoginStatus('authenticated');
            } else {
                get().setLoginStatus('unauthenticated');
            }
        }
    },
    logout: () => {
        get().clearTokens();
        get().clearUser();
        removeAuthToken();
        removeRefreshToken();
        get().setLoginStatus('unauthenticated');
    },
    hydrate: async () => {
        try {
            const userToken = localStorage.getItem('userToken');
            if(userToken !== null)
            {
                await get().signIn(userToken);
            }
            else {
                get().logout();
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}));

export default useAuthStore;
