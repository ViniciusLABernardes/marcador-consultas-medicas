import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './src/routes';
import theme from './src/styles/themes';
import { StatusBar } from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
     <AuthProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={theme.colors.primary}/>
      <AppNavigator/>
     </AuthProvider>
    </ThemeProvider>
  );
}