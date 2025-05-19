// src/screens/Register.tsx
import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../utils/styles';
import AuthForm from '../components/AuthForm';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';

const Register = ({ navigation }: any) => {
    const { login } = useAuth();

    const handleRegister = async (values: { email: string; password: string }) => {
        try {
            const res = await api.post('/auth/signup', values);

            if (res.data?.token && res.data?.userId) {
                await AsyncStorage.setItem('userId', res.data.userId);
                await login(res.data.token); // ✅ triggers rerender
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            console.error('Registration error:', err.response?.data || err.message);
            Alert.alert('Registration Failed', err.response?.data?.error || 'Try again later.');
        }
    };

    return (
        <Animated.View entering={ FadeInDown.duration(600) } style={ styles.authContainer }>
            <Animated.View style={ styles.authCard }>
                <Text style={ styles.authHeader }>Register</Text>
                <AuthForm type="register" onSubmit={ handleRegister } />
                <TouchableOpacity onPress={ () => navigation.navigate('Login') }>
                    <Text style={ styles.switchAuthText }>Already have an account? Log in</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

export default Register;
