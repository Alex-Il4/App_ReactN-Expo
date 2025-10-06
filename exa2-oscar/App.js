import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { ThemeProvider } from './frontend/context/ThemeContext';
import { UserProvider, useUser } from './frontend/context/UserContext'; 
import LoginScreen from './frontend/screens/LoginScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import AppTabs from './AppNavigation';
import VentaScreen from './frontend/screens/VentaScreen';
import EditSaleScreen from './frontend/screens/EditSales';

// SQLite
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './frontend/db/database';

const Stack = createNativeStackNavigator();

const AppContent = () => {
    const { user, setUser } = useUser(); 
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken'); 
                if (userToken) {
                    setUser(true);
                }
            } catch (e) {
                console.error("Fallo al verificar token", e);
            } finally {
                setIsLoading(false);
            }
        };
        checkLogin();
    }, []);

    if (isLoading) {
        // Podrías devolver un componente de carga más elegante aquí
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Cargando aplicación...</Text>
            </View>
        );
    }
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="Administrar" component={ProfileScreen} />
                        <Stack.Screen name="Vender" component={VentaScreen} />
                        <Stack.Screen name="EditarVenta" component={EditSaleScreen} />
                    </>
                ) : (
                    // Si NO hay usuario (deslogueado): Muestra el Stack de autenticación
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const App = () => {
    return (
        <ThemeProvider>
            <UserProvider>
                <SQLiteProvider databaseName="nombre_db" onInit={initializeDatabase}>
                    <AppContent />
                </SQLiteProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;