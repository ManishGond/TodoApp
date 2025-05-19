// src/screens/Login.tsx
import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../utils/styles';
import AuthForm from '../components/AuthForm';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }: any) => {
    const { login } = useAuth();

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const res = await api.post('/auth/login', values);

            if (res.data?.token && res.data?.userId) {
                await AsyncStorage.setItem('userId', res.data.userId);
                await login(res.data.token); // ✅ triggers rerender
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            console.error('Login error:', err.response?.data || err.message);
            Alert.alert('Login Failed', err.response?.data?.error || 'Invalid credentials or server error.');
        }
    };

    return (
        <Animated.View entering={ FadeInDown.duration(600) } style={ styles.authContainer }>
            <Animated.View style={ styles.authCard }>
                <Text style={ styles.authHeader }>Login</Text>
                <AuthForm type="login" onSubmit={ handleLogin } />
                <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
                    <Text style={ styles.switchAuthText }>Don't have an account? Register</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

export default Login;
