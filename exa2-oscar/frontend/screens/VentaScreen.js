import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg'; // 👈 Importamos lo necesario para SVG
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from '../context/ThemeContext';

const VentaScreen = ({ route }) => {
    const navigation = useNavigation();
    const db = useSQLiteContext(); 
    const { darkMode } = useTheme();
    //Estado para la imagen seleccionada
    const [imageUrl, setImageUrl] = useState(null);
    //Estados para los datos de la tarjeta
    const [imageAlt, setImageAlt] = useState('');
    const [puertas, setPuertas] = useState('');
    const [title, setTitle] = useState('');
    const [formattedPrice, setFormattedPrice] = useState('');
    const [reviewCount, setReviewCount] = useState('');

    //Función para seleccionar una imagen de la galería
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

    //Función para manejar el envío del formulario y guardar en SQLite
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
                    parseInt(puertas), //Se guarda como entero
                    formattedPrice,
                    parseInt(reviewCount || 0), //Se guarda como entero o 0
                    imageUrl,
                    imageAlt,
                ]
            );

            Alert.alert("Éxito", "Vehículo guardado correctamente en la base de datos.");
            
            //Limpiar formulario
            setTitle('');
            setPuertas('');
            setFormattedPrice('');
            setImageUrl(null);
            setImageAlt('');
            setReviewCount('');
            navigation.goBack(); 

        } catch (error) {
            console.error("Error al guardar en SQLite:", error);
            Alert.alert("Error", "Ocurrió un error al guardar el vehículo.");
        }
    };
    //Se esta usando un SVG para mostrar el icono de la cámara
    //Esta funcion la pedi a la IA, ya que el icono de la cámara aparecia como letra china
    const ImageUploadSVG = ({ size = 50, color = "#007ca5ff" }) => (
    <Svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={color}
    >
        {/* Este Path muestra una nube, ya que el icono de la cámara esta fallando */}
<Path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.88 2.59-7.77 6.04C2.86 10.36 2 11.45 2 12.7c0 2.07 1.68 3.75 3.75 3.75h12.5C20.32 16.45 22 14.77 22 12.7c0-1.57-1.08-2.92-2.65-3.66zM15 9l-3-3-3 3h2v3h2V9z"/>
    </Svg>
);
    //Estilos
    const styles = StyleSheet.create({
    container: {
            flexGrow: 1,
            padding: 20,
            backgroundColor: darkMode ? '#1a1a1a' : '#f8f8f8', 
            alignItems: 'center',
        },
        header: {
            fontSize: 28,
            fontWeight: 'bold',
            color: darkMode ? '#00c0ff' : '#0d70adff',
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Vender Vehiculo</Text>
            
            <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePicker}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderContent}>
                <ImageUploadSVG size={50} color={darkMode ? '#00c0ff' : '#007ca5ff'} /> 
                        <Text style={styles.imagePlaceholderText}>Subir Imagen</Text>
                    </View>
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Vehículo"
                placeholderTextColor="#be5c00a4"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Puertas"
                placeholderTextColor="#be5c00a4"
                value={puertas}
                onChangeText={setPuertas}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                placeholderTextColor="#be5c00a4"
                value={formattedPrice}
                onChangeText={setFormattedPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de reseñas"
                placeholderTextColor="#be5c00a4"
                value={reviewCount}
                onChangeText={setReviewCount}
                keyboardType="numeric"
            />
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
export default VentaScreen;