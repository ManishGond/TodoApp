// App.tsx
import React from 'react';
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

const AppNavigator = () => {
  const { userToken, isLoading } = useAuth();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (isLoading) return null;

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

const App = () => {
  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
