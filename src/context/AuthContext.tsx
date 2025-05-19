import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    userToken: string | null;
    userEmail: string | null;
    login: (token: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    userToken: null,
    userEmail: null,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                // 🔥 Optional: Simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                const token = await AsyncStorage.getItem('token');
                const email = await AsyncStorage.getItem('email');

                setUserToken(token);
                setUserEmail(email);
            } catch (error) {
                console.error('Failed to load auth data', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthData();
    }, []);

    const login = async (token: string, email: string) => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        setUserToken(token);
        setUserEmail(email);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        setUserToken(null);
        setUserEmail(null);
    };

    return (
        <AuthContext.Provider value={ { userToken, userEmail, login, logout, isLoading } }>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
