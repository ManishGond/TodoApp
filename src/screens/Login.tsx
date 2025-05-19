import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../utils/styles';
import AuthForm from '../components/AuthForm';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';

const Login = ({ navigation }: any) => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', values);

            if (res.data?.token && res.data?.userId) {
                await AsyncStorage.setItem('userId', res.data.userId);
                await login(res.data.token);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            console.error('Login error:', err.response?.data || err.message);
            Alert.alert('Login Failed', err.response?.data?.error || 'Invalid credentials or server error.');
        } finally {
            setIsLoading(false); // In case of error, don't hang the loader
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
            { isLoading && <FullScreenLoader /> }
        </Animated.View>
    );
};

export default Login;
