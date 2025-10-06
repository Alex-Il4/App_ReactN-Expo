import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSQLiteContext } from 'expo-sqlite';
import { useTheme } from '../context/ThemeContext';


const EditSaleScreen = ({ route }) => {
    const navigation = useNavigation();
    const db = useSQLiteContext();
    const { darkMode } = useTheme();
    const initialVehicle = route.params?.vehicle || {};
    const vehicleId = initialVehicle.id;

    //Estados inicializados con los datos existentes
    const [imageUrl, setImageUrl] = useState(initialVehicle.imageUrl || null);
    const [imageAlt, setImageAlt] = useState(initialVehicle.imageAlt || '');
    const [puertas, setPuertas] = useState(initialVehicle.puertas?.toString() || '');
    const [title, setTitle] = useState(initialVehicle.title || '');
    const [formattedPrice, setFormattedPrice] = useState(initialVehicle.formattedPrice || '');
    const [reviewCount, setReviewCount] = useState(initialVehicle.reviewCount?.toString() || '');
    const [loading, setLoading] = useState(false);

    // Estilos (Usar los mismos estilos de VentaScreen para consistencia)
const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: darkMode ? '#121212' : '#f8f8f8',
            padding: 10,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
            color: darkMode ? '#fff' : '#393939',
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
    //Si no hay ID no se puede editar.
    useEffect(() => {
        if (!vehicleId) {
            Alert.alert("Error", "ID del vehículo no encontrado para edición.");
            navigation.goBack();
        }
    }, [vehicleId]);


    // Función para seleccionar una imagen (misma lógica que en VentaScreen)
    const handleImagePicker = async () => {
        // ... (código de ImagePicker aquí, omitido por brevedad, usa la lógica de VentaScreen)
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

    // 🚨 Función para guardar los cambios con UPDATE 🚨
    const handleUpdate = async () => {
        if (!title || !puertas || !formattedPrice || !imageUrl) {
            Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
            return;
        }

        setLoading(true);

        try {
            await db.runAsync(
                `UPDATE vehicles SET 
                title = ?, puertas = ?, formattedPrice = ?, reviewCount = ?, imageUrl = ?, imageAlt = ?
                WHERE id = ?`,
                [
                    title,
                    parseInt(puertas),
                    formattedPrice,
                    parseInt(reviewCount || 0),
                    imageUrl,
                    imageAlt,
                    vehicleId // 🚨 ID necesario para la cláusula WHERE 🚨
                ]
            );

            Alert.alert("Éxito", `Vehículo con ID ${vehicleId} actualizado correctamente.`);
            navigation.goBack(); // Vuelve a ManageSalesScreen para ver el cambio

        } catch (error) {
            console.error("Error al actualizar en SQLite:", error);
            Alert.alert("Error", "Ocurrió un error al actualizar el vehículo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Editar campos</Text>

            <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePicker} disabled={loading}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderContent}>
                        <MaterialIcons name="camera-alt" size={50} color="#007ca5ff" />
                        <Text style={styles.imagePlaceholderText}>Cambiar Imagen</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#be5c00a4"
                value={title}
                onChangeText={setTitle}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Puertas"
                placeholderTextColor="#be5c00a4"
                value={puertas}
                onChangeText={setPuertas}
                keyboardType="numeric"
                editable={!loading}
            />
            {/* ... (Otros TextInputs) ... */}
            <TextInput
                style={styles.input}
                placeholder="Precio"
                placeholderTextColor="#be5c00a4"
                value={formattedPrice}
                onChangeText={setFormattedPrice}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de reseñas"
                placeholderTextColor="#be5c00a4"
                value={reviewCount}
                onChangeText={setReviewCount}
                keyboardType="numeric"
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Texto alternativo para la imagen"
                placeholderTextColor="#be5c00a4"
                value={imageAlt}
                onChangeText={setImageAlt}
                editable={!loading}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={loading}>
                <Text style={styles.saveButtonText}>
                    {loading ? 'Actualizando...' : 'Guardar Cambios'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};



export default EditSaleScreen;