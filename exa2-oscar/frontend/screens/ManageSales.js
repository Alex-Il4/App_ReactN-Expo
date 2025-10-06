import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from '../context/ThemeContext';

const ManageSalesScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { darkMode } = useTheme();
    const db = useSQLiteContext();

    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 🚨 1. Cargar los Datos de la DB 🚨
    const loadVehicles = async () => {
        try {
            const result = await db.getAllAsync("SELECT * FROM vehicles ORDER BY id DESC");
            setVehicles(result);
        } catch (error) {
            console.error("Error al cargar vehículos:", error);
            Alert.alert("Error de Carga", "No se pudieron obtener los datos de la base de datos.");
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Ejecutar la carga al enfocar la pantalla (para ver los cambios)
    useEffect(() => {
        if (isFocused) {
            loadVehicles();
        }
    }, [isFocused]);

    // 🚨 3. Función para Eliminar una Venta 🚨
    const handleDelete = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que quieres eliminar este vehículo?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await db.runAsync("DELETE FROM vehicles WHERE id = ?", [id]);
                            Alert.alert("Éxito", "Vehículo eliminado correctamente.");
                            loadVehicles(); // Recargar la lista
                        } catch (error) {
                            console.error("Error al eliminar:", error);
                            Alert.alert("Error", "No se pudo eliminar el registro.");
                        }
                    }
                },
            ]
        );
    };
    
    // 4. Función para navegar a la pantalla de edición
    const handleEdit = (vehicleData) => {
        // Navegar a la pantalla de edición pasando todos los datos
        navigation.navigate('EditarVenta', { vehicle: vehicleData });
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, darkMode && styles.cardDark]}>
            <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.cardImage} 
            />
            <View style={styles.cardDetails}>
                <Text style={[styles.cardTitle, darkMode && styles.textWhite]}>{item.title}</Text>
                <Text style={[styles.cardPrice, darkMode && styles.textWhite]}>{item.formattedPrice}</Text>
                
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEdit(item)}
                    >
                        <MaterialIcons name="edit" size={20} color="#fff" />
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDelete(item.id)}
                    >
                        <MaterialIcons name="delete" size={20} color="#fff" />
                        <Text style={styles.actionText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#0d70adff" />
                <Text style={{ color: darkMode ? '#fff' : '#393939', marginTop: 10 }}>Cargando datos de ventas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.header, darkMode && styles.textWhite]}>Administrar Ventas</Text>
            <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <Text style={[styles.emptyText, darkMode && styles.textWhite]}>
                        No hay registros de ventas para administrar.
                    </Text>
                )}
            />
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#393939',
    },
    textWhite: {
        color: '#fff',
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#333',
    },
    cardImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    cardDetails: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardPrice: {
        fontSize: 14,
        color: '#0d70ad',
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 5,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#0d70ad',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
    }
});

export default ManageSalesScreen;