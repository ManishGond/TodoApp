import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import styles from '../utils/styles';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';
import { useFocusEffect } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

const backgroundImages = [
    require('../assets/bg-4.png'),
    require('../assets/bg-2.png'),
    require('../assets/bg-1.png'),
    require('../assets/bg-3.png'),
    require('../assets/bg-5.png'),
    require('../assets/bg-6.png'),
    require('../assets/bg-7.png'),
    require('../assets/bg-8.png'),
];
const getRandomBackground = () => {
    const index = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[index];
};

const Login = ({ navigation }: any) => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', values);

            if (res.data?.token && res.data?.userId) {
                await AsyncStorage.setItem('userId', res.data.userId);
                await login(res.data.token, res.data.email);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            console.error('Login error:', err.response?.data || err.message);
            Alert.alert(
                'Login Failed',
                err.response?.data?.error || 'Invalid credentials or server error.',
            );
        } finally {
            setIsLoading(false);
        }
    };
    const [backgroundImage, setBackgroundImage] = useState(getRandomBackground());

    useFocusEffect(
        useCallback(() => {
            setBackgroundImage(getRandomBackground());
        }, []),
    );

    useEffect(() => {
        createChannels();
    }, []);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: 'todo-channel',
                channelName: 'Todo Channel',
            },
            created => console.log(`createChannel (1) returned '${created}'`),
        );
    };

    return (
        <ImageBackground
            source={ backgroundImage }
            style={ { flex: 1, justifyContent: 'center', alignContent: 'center' } }
            resizeMode="cover">
            <Animated.View
                entering={ FadeInDown.duration(600) }
                style={ styles.authContainer }>
                <Animated.View style={ styles.authCard }>
                    <Text style={ styles.authHeader }>Login</Text>
                    <AuthForm type="login" onSubmit={ handleLogin } />
                    <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
                        <Text style={ styles.switchAuthText }>
                            Don't have an account? Register
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                { isLoading && <FullScreenLoader /> }
            </Animated.View>
        </ImageBackground>
    );
};

export default Login;