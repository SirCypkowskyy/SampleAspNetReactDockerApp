import {User} from "@/types/global";
import {create} from "zustand";
import {removeAuthToken, removeRefreshToken, setAuthToken, setRefreshToken} from "@/lib/utils.ts";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    loginStatus: 'authenticated' | 'unauthenticated' | 'pending';
}

/**
 * AuthActions is an interface that defines the actions that can be performed on the AuthStore.
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

type AuthStore = AuthState & AuthActions;

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
