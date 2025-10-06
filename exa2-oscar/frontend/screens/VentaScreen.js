import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Usamos MaterialIcons
import { useSQLiteContext } from 'expo-sqlite'; // 🚨 Importa el hook para acceder a la DB 🚨

const VentaScreen = ({ route }) => {
    const navigation = useNavigation();
    const db = useSQLiteContext(); 
    
    // Estado para la imagen seleccionada
    const [imageUrl, setImageUrl] = useState(null);

    // Estados para los datos de la tarjeta
    const [imageAlt, setImageAlt] = useState('');
    const [puertas, setPuertas] = useState(''); // 🚨 Renombrado a 'puertas' 🚨
    const [title, setTitle] = useState('');
    const [formattedPrice, setFormattedPrice] = useState('');
    const [reviewCount, setReviewCount] = useState('');

    // Función de utilidad para recargar la lista si fuera necesario
    // const loadVehicles = async () => { /* ... */ };

    // Función para seleccionar una imagen de la galería
    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUrl(result.assets[0].uri);
        }
    };

    // 🚨 Función para manejar el envío del formulario y guardar en SQLite 🚨
    const handleSave = async () => {
        if (!title || !puertas || !formattedPrice || !imageUrl) {
            Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
            return;
        }

        try {
            await db.runAsync(
                `INSERT INTO vehicles 
                (title, puertas, formattedPrice, reviewCount, imageUrl, imageAlt) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    title,
                    parseInt(puertas), // Se guarda como INTEGER
                    formattedPrice,
                    parseInt(reviewCount || 0), // Se guarda como INTEGER o 0
                    imageUrl,
                    imageAlt,
                ]
            );

            Alert.alert("Éxito", "Vehículo guardado correctamente en la base de datos.");
            
            // Limpiar formulario
            setTitle('');
            setPuertas('');
            setFormattedPrice('');
            setImageUrl(null);
            setImageAlt('');
            setReviewCount('');
            
            // Opcional: Si Home necesita recargar los datos, puedes usar un hook o navegación
            navigation.goBack(); 

        } catch (error) {
            console.error("Error al guardar en SQLite:", error);
            Alert.alert("Error", "Ocurrió un error al guardar el vehículo.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Vender Vehiculo</Text>
            
            <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePicker}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderContent}>
                        <MaterialIcons name="camera-alt" size={50} color="#007ca5ff" />
                        <Text style={styles.imagePlaceholderText}>Subir Imagen</Text>
                    </View>
                )}
            </TouchableOpacity>
            
            {/* Input Título */}
            <TextInput
                style={styles.input}
                placeholder="Título (Ej. Porsche 911 Turbo)"
                placeholderTextColor="#be5c00a4"
                value={title}
                onChangeText={setTitle}
            />
            {/* Input Puertas (antes beds) */}
            <TextInput
                style={styles.input}
                placeholder="Número de Puertas (Ej. 3)"
                placeholderTextColor="#be5c00a4"
                value={puertas} // 🚨 Usando 'puertas' 🚨
                onChangeText={setPuertas}
                keyboardType="numeric"
            />
            {/* Input Precio */}
            <TextInput
                style={styles.input}
                placeholder="Precio (Ej. 22500€)"
                placeholderTextColor="#be5c00a4"
                value={formattedPrice}
                onChangeText={setFormattedPrice}
            />
            {/* Input Reseñas */}
            <TextInput
                style={styles.input}
                placeholder="Número de reseñas (Ej. 34)"
                placeholderTextColor="#be5c00a4"
                value={reviewCount}
                onChangeText={setReviewCount}
                keyboardType="numeric"
            />
            {/* Input Texto alternativo */}
            <TextInput
                style={styles.input}
                placeholder="Texto alternativo para la imagen"
                placeholderTextColor="#be5c00a4"
                value={imageAlt}
                onChangeText={setImageAlt}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Venta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Estilos (simplificados aquí, puedes usar tus estilos completos)
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0d70adff',
        marginBottom: 30,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#007ca5ff',
        overflow: 'hidden',
    },
    placeholderContent: {
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 5,
        color: '#007ca5ff',
        fontSize: 16,
        fontWeight: '500',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#0d70adff',
        fontSize: 16,
    },
    saveButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#0d70adff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        elevation: 3,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default VentaScreen;