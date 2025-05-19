import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    userToken: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    userToken: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                // 🔥 Simulate delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                const token = await AsyncStorage.getItem('token');
                setUserToken(token);
            } catch (error) {
                console.error('Failed to load token', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadToken();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={ { userToken, login, logout, isLoading } }>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
