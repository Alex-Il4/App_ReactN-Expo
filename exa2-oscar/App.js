import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'; // Asegúrate de importar React hooks si los usas
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para verificar la sesión inicial
import { Text, View } from 'react-native'; // Para mostrar un mensaje mientras se verifica el token
// Importa los proveedores y el hook useUser
import { ThemeProvider } from './frontend/context/ThemeContext';
import { UserProvider, useUser } from './frontend/context/UserContext'; // 🚨 IMPORTAR useUser

// Importa todas las pantallas
import LoginScreen from './frontend/screens/LoginScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import AppTabs from './AppNavigation';

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