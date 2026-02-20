import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screen
import LoginScreen from './components/login_screen';
import HomeScreen from './components/home_screen';
import CurrencySearchByRegion from './components/currency_searchby_region';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#714B67' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Menu Utama' }}
        />
        <Stack.Screen 
          name="CurrencySearchByRegion" 
          component={CurrencySearchByRegion} 
          options={{ title: 'Currency by Region' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
