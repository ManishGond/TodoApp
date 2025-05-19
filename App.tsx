import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

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

// ✅ Handles auth logic and screen routing
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

// ✅ Handles auth loading & splash hiding
const AppWithAuth = () => {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return <AppNavigator />;
};

// ✅ App root
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
