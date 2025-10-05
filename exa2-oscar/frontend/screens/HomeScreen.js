import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // 👈 Asegúrate de que esta librería esté instalada
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // 👈 Importamos el contexto global

const gradientColors = ['#007ca5ff', '#0d70adff']; // Colores para el botón flotante

const HomeScreen = () => {
    const navigation = useNavigation();
    const { darkMode } = useTheme();
    const tabBarHeight = useBottomTabBarHeight();
    
    // 🚨 Obtener el objeto de usuario desde el contexto global 🚨
    const { user } = useUser(); 

    // La variable 'user' ahora es un objeto: { username: '...', token: '...' }

    const handleAINavigate = () => {
        // Asegúrate de que 'AIChat' esté definido en tu Stack Navigator
        navigation.navigate('AIChat');
    };

    // Estilos basados en el modo oscuro
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#C2B9B6',
            alignItems: 'center',
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 20,
            color: darkMode ? '#fff' : '#393939',
        },
        floatingAIButton: {
            position: 'absolute',
            bottom: tabBarHeight + 20, // Ajuste para que quede sobre el Tab Bar
            right: 20,
            borderRadius: 30,
            overflow: 'hidden',
            elevation: 8,
        },
        linearGradient: {
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <View style={styles.container}>
            {/* Mensaje de Bienvenida */}
            {/* 🚨 ACCESO CORREGIDO: Usar user?.username 🚨 */}
            <Text style={styles.title}>
                Bienvenido {user?.username || 'usuario'}, a la Clinica Pediatrica
            </Text>

            {/* Botones de Navegacion Principal (Añadir aquí) */}
            {/* Si tienes más contenido, va aquí */}
            
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