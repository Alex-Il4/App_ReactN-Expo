import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; 
import { useSQLiteContext } from 'expo-sqlite'; // 👈 Importamos el hook de SQLite

const gradientColors = ['#007ca5ff', '#0d70adff']; 

const HomeScreen = () => {
    const navigation = useNavigation();
    const { darkMode } = useTheme();
    const tabBarHeight = useBottomTabBarHeight();
    const { user } = useUser(); 
    
    // 🚨 Estado para almacenar los datos de la DB 🚨
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const db = useSQLiteContext(); // 👈 Inicializamos la DB

    // 🚨 Función para cargar los datos de la tabla 'vehicles' 🚨
    const loadVehicles = async () => {
        try {
            // Usamos getAllAsync con la nueva tabla 'vehicles'
            const result = await db.getAllAsync("SELECT * FROM vehicles ORDER BY id DESC");
            setVehicles(result);
        } catch (error) {
            console.error("Error al cargar vehículos:", error);
            // Opcional: Mostrar un Alert al usuario si la carga falla
        } finally {
            setIsLoading(false);
        }
    };

    // 🚨 useEffect para cargar los datos al inicio y cada vez que la pantalla esté enfocada 🚨
    useEffect(() => {
        // Cargar datos al montar
        loadVehicles();

        // Opcional: Recargar datos cada vez que la pantalla vuelve a estar enfocada (útil tras añadir una venta)
        const unsubscribe = navigation.addListener('focus', () => {
            loadVehicles();
        });

        return unsubscribe; // Limpieza del listener
    }, [navigation]);


    // Componente para renderizar cada item en el FlatList
    const renderVehicleItem = ({ item }) => (
        <View style={[styles.card, darkMode && styles.cardDark]}>
            <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.cardImage} 
                accessibilityLabel={item.imageAlt}
            />
            <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, darkMode && styles.cardTitleDark]}>{item.title}</Text>
                
                <View style={styles.cardDetails}>
                    <Text style={[styles.detailText, darkMode && styles.detailTextDark]}>
                        <MaterialIcons name="door-front" size={14} color={darkMode ? '#aaa' : '#555'} /> {item.puertas} Puertas
                    </Text>
                    <Text style={[styles.detailText, darkMode && styles.detailTextDark]}>
                        <MaterialIcons name="attach-money" size={14} color={darkMode ? '#aaa' : '#555'} /> {item.formattedPrice}
                    </Text>
                </View>

                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
                    <Text style={styles.reviewText}>({item.reviewCount || '0'} reseñas)</Text>
                </View>
            </View>
        </View>
    );

    const handleAINavigate = () => {
        navigation.navigate('AIChat');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#C2B9B6',
            paddingTop: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: darkMode ? '#fff' : '#393939',
            paddingHorizontal: 20,
        },
        listContainer: {
            paddingHorizontal: 15,
            paddingBottom: tabBarHeight + 100, // Espacio suficiente para el botón flotante
        },
        card: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 12,
            marginBottom: 15,
            overflow: 'hidden',
            elevation: 3,
        },
        cardDark: {
            backgroundColor: '#333',
            elevation: 5,
        },
        cardImage: {
            width: 120,
            height: 120,
            resizeMode: 'cover',
        },
        cardInfo: {
            padding: 10,
            flex: 1,
            justifyContent: 'space-around',
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#393939',
        },
        cardTitleDark: {
            color: '#fff',
        },
        cardDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
        },
        detailText: {
            fontSize: 14,
            color: '#555',
        },
        detailTextDark: {
            color: '#aaa',
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        ratingText: {
            marginLeft: 5,
            fontSize: 14,
            fontWeight: 'bold',
            color: darkMode ? '#fff' : '#393939',
        },
        reviewText: {
            marginLeft: 5,
            fontSize: 12,
            color: '#888',
        },
        floatingAIButton: {
            position: 'absolute',
            bottom: tabBarHeight + 20,
            right: 20,
            borderRadius: 30,
            overflow: 'hidden',
            elevation: 8,
            zIndex: 10, // Asegura que esté sobre la FlatList
        },
        linearGradient: {
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#0d70adff" />
                <Text style={{ color: darkMode ? '#fff' : '#393939', marginTop: 10 }}>Cargando vehículos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Mensaje de Bienvenida */}
            <Text style={styles.title}>
                Bienvenido {user?.username || 'usuario'}, a la Clinica Pediatrica
            </Text>

            {/* 🚨 FLATLIST para mostrar los vehículos 🚨 */}
            <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderVehicleItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 50, color: darkMode ? '#ccc' : '#555' }}>
                        Aún no hay vehículos en venta.
                    </Text>
                )}
                style={{ flex: 1, width: '100%' }}
            />
            
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