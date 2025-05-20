import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'This app needs permission to send you task notifications.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        'Permission Denied',
        'Without this, you won’t receive reminders for your tasks.',
      );
    }
  }
};

const AppNavigator = () => {
  const { userToken } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ { headerShown: false, animation: 'fade' } }>
        { userToken ? (
          <Stack.Screen name="Home" component={ Home } />
        ) : (
          <>
            <Stack.Screen name="Login" component={ Login } />
            <Stack.Screen name="Register" component={ Register } />
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithAuth = () => {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
      requestNotificationPermission(); // ✅ Safe here
    }
  }, [isLoading]);

  if (isLoading) return null;

  return <AppNavigator />;
};

const App = () => {
  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
