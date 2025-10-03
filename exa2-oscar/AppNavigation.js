import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
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
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;