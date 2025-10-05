import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './frontend/screens/HomeScreen';
import SettingsScreen from './frontend/screens/SettingsScreen';
import { useTheme } from './frontend/context/ThemeContext';
const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { darkMode } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
      headerStyle: { backgroundColor: darkMode ? '#222' : '#dfdfdfff' },
      headerTintColor: darkMode ? '#ffffffff' : '#393939',
      tabBarStyle: { backgroundColor: darkMode ? '#222' : '#dfdfdfff' },
      tabBarActiveTintColor: darkMode ? '#fff' : '#007ca5ff',
      tabBarInactiveTintColor: darkMode ? '#C2B9B6' : '#003dadff',
      }}>
      <Tab.Screen name="Inicio" component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Configuracion" component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default AppTabs;