import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const ProfileScreen = () => {
    const { darkMode } = useTheme();
    const { user, updateUser } = useUser(); 

    //Estado local para el campo de edición, inicializandolo con el valor del contexto
    const [editableUsername, setEditableUsername] = useState(user || '');
    const [isFocused, setIsFocused] = useState(false);

    //Sincronizar el estado local si el contexto cambia
    useEffect(() => {
        if (user && user !== editableUsername) {
            setEditableUsername(user);
        }
    }, [user]);

    //Función para guardar los cambios usando el contexto
    const handleUpdate = async () => {
        const trimmedName = editableUsername.trim();
        
        if (!trimmedName) {
            Alert.alert("Error", "El nombre de usuario no puede estar vacío.");
            return;
        }
        if (trimmedName === user) {
            Alert.alert("Información", "No hay cambios para guardar.");
            return;
        }
        //Llama a la función del contexto
        await updateUser(trimmedName);
        Alert.alert("Éxito", "¡Nombre de usuario actualizado!");
    };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkMode ? '#222' : '#C2B9B6', 
        alignItems: 'center',
        padding: 20,
    },
    cardContainer: {
        width: '100%',
        backgroundColor: darkMode ? '#333' : '#ffffff', 
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: darkMode ? '#fff' : '#393939', 
    },
    instructionText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: darkMode ? '#b0b0b0' : '#777',
        fontStyle: 'italic',
    },
    infoField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 5,
    },
    fieldIcon: {
        marginRight: 10,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#393939',
        minWidth: 70,
    },
    fieldInput: { 
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
        color: darkMode ? '#fff' : '#000',
        borderBottomWidth: 1, 
        borderBottomColor: isFocused ? '#0d70ad' : (darkMode ? '#555' : '#ccc'),
    },
    fieldValue: { 
        fontSize: 16,
        color: darkMode ? '#fff' : '#000',
    },
    button: {
        height: 45,
        backgroundColor: '#0d70adff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
  });

   return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <Text style={styles.instructionText}>
                    Para actualizar su nombre de usuario solo debe cambiar el nombre en el campo Usuario y presionar "Editar Perfil".
                </Text>
                <View style={styles.infoField}>
                    <MaterialIcons name="person" size={20} color={darkMode ? '#b0b0b0ff' : "#0d70ad"} style={styles.fieldIcon} />
                    <Text style={styles.fieldLabel}>Usuario: </Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={editableUsername}
                        onChangeText={setEditableUsername}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Ingrese nuevo nombre"
                        placeholderTextColor={darkMode ? '#888' : '#aaa'}
                    />
                </View>
                <View style={styles.infoField}>
                    <MaterialIcons name="mail" size={20} color={darkMode ? '#b0b0b0ff' : "#0d70ad"} style={styles.fieldIcon} />
                    <Text style={styles.fieldLabel}>Correo: </Text>
                    <Text style={styles.fieldValue}>{user?.username}@gmail.com</Text> 
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <MaterialIcons name="save" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </TouchableOpacity>

            </View>
            <StatusBar style={darkMode ? "light" : "dark"} />
        </View>
    );
};

export default ProfileScreen;
