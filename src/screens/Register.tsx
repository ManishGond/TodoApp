import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import styles from '../utils/styles';
import api from '../utils/api';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';

const Register = ({ navigation }: any) => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (values: { email: string; password: string }) => {
        setIsLoading(true);

        try {
            const res = await api.post('/auth/signup', values);

            if (res.data?.token && res.data?.userId) {
                await AsyncStorage.setItem('userId', res.data.userId);
                await login(res.data.token);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            console.error('Registration error:', err.response?.data || err.message);
            Alert.alert(
                'Registration Failed',
                err.response?.data?.error || 'Something went wrong. Please try again.'
            );
        } finally {
            setIsLoading(false); // ensures loader disappears even if request fails
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

            { isLoading && <FullScreenLoader /> }
        </Animated.View>
    );
};

export default Register;
