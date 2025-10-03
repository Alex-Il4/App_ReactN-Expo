import React, { useState, useEffect, useMemo } from 'react'; // Añadido useMemo
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// --- Importaciones de Librerías de Terceros ---
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient'; 

// --- Importaciones de Contextos ---
import { useTheme } from '../context/ThemeContext'; 

// Definicion de constantes (fuera del componente para evitar recreacion)
const gradientColors = ['#007bff', '#8A2BE2', '#FF69B4'];
const AI_BUTTON_SIZE = 60;
const AI_BUTTON_MARGIN = 20;


const HomeScreen = () => {
    // --- 1. Hooks ---
    const navigation = useNavigation();
    const { darkMode } = useTheme(); // Hook de Tema
    const tabBarHeight = useBottomTabBarHeight(); // Hook de Navegación
    
    // --- 2. Estado ---
    const [user, setUser] = useState(''); 
    
    // --- 3. Efectos ---
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error("Error al cargar usuario de AsyncStorage", error);
            }
        };
        loadUser();
    }, []);

    // --- 4. Estilos Dinámicos (Usando useMemo para optimización) ---
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: darkMode ? '#222' : '#C2B9B6',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 30,
            paddingTop: 50,
        },
        title: {
            fontSize: 30,
            margin: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: darkMode ? '#b0b0b0ff' : '#393939',
        },
        // ... (otros estilos de boton y texto)
        
        // Estilos del Boton Flotante AI
        floatingAIButton: {
            position: 'absolute', 
            right: AI_BUTTON_MARGIN, 
            bottom: AI_BUTTON_MARGIN + tabBarHeight, // Ajuste con el hook
            width: AI_BUTTON_SIZE, 
            height: AI_BUTTON_SIZE,
            borderRadius: AI_BUTTON_SIZE / 2, 
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5, 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        linearGradient: {
            width: '100%',
            height: '100%',
            borderRadius: AI_BUTTON_SIZE / 2, // Usar la mitad del tamaño para el radio
            justifyContent: 'center',
            alignItems: 'center',
        },
    }), [darkMode, tabBarHeight]); // Re-calcula solo si estos valores cambian

    // --- 5. Handlers ---
    const handleAINavigate = () => {
        // Asegúrate de que 'AIChat' esté definido en tu Stack Navigator
        navigation.navigate('AIChat'); 
    };

    return (
        <View style={styles.container}>
            {/* Mensaje de Bienvenida */}
            <Text style={styles.title}>
                Bienvenido {user || 'usuario'}, a la Clinica Pediatrica
            </Text>
            
            {/* Botones de Navegacion Principal (Añadir aquí) */}
            {/* ... */}

            {/* Botón flotante de IA */}
            <TouchableOpacity style={styles.floatingAIButton} onPress={handleAINavigate}>
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.linearGradient}
                >
                    <MaterialIcons name="auto-awesome" size={28} color="#FFFFFF" /> 
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
};

export default HomeScreen;