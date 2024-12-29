import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import { RootStackParamList } from './navigation/types';
import RegisterScreen from './components/RegistrationScreen';
import GetStartedScreen from './components/GetStartedScreen';
import HomeScreen from './components/HomeScreen';
import { CountProvider } from './context/CountContext';
const Stack = createNativeStackNavigator<RootStackParamList>();

const Index: React.FC = () => {
  return (
    <CountProvider>
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStartedScreen}  />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    </CountProvider>
  );
};

export default Index;
