import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    
    //Obtener setUser del context
    const { darkMode } = useTheme();
    const { setUser } = useUser(); 

    const handleLogin = async() => {
        if (username && password) {
            const userData = { username: username, token: 'fakeToken' };
            //Almacenar los datos en asyncstorage
            await AsyncStorage.setItem('user', username);
            await AsyncStorage.setItem('userToken', userData.token); 
            setUser(userData); 
            
        } else {
            Alert.alert('Error', 'Debe ingresar usuario y contraseña');
        }
    };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: darkMode ? '#222' : '#C2B9B6',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 20,
    },
    texto: {
      fontSize: 30,
      margin: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: darkMode ? '#fff' : '#393939ff',
    },
    input: {
      width: '60%',
      height: 50,
      borderColor: darkMode ? '#aaaaaaff' : '#005387ff',
      borderWidth: 1,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      width: '100%',
      backgroundColor: darkMode ? '#333' : '#ffffff',
      color: darkMode ? '#ffffffff' : '#000',
      fontSize: 18,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: darkMode ? '#5c5c5cff' : '#0d70adff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    logo: {
      width: 150,
      height: 150,
      borderRadius: 60,
      alignSelf: 'center',
    },
  });

  return (
        <View style={styles.container}>
            <Text style={styles.texto}>Inicia Sesion</Text>

            <TextInput 
                style={[
                    styles.input, 
                    { borderWidth: isFocused1 ? 3 : 1, borderColor: isFocused1 ? '#007ca5ff' : styles.input.borderColor } // Mejorar el color de foco
                ]}
                placeholder="Usuario"
                placeholderTextColor={darkMode ? '#ccc' : '#777'}
                value={username} 
                onChangeText={setUsername} 
                onFocus={() => setIsFocused1(true)} 
                onBlur={() => setIsFocused1(false)} />

            <TextInput 
                style={[
                    styles.input, 
                    { borderWidth: isFocused2 ? 3 : 1, borderColor: isFocused2 ? '#007ca5ff' : styles.input.borderColor }
                ]} 
                placeholder="Contraseña"
                placeholderTextColor={darkMode ? '#ccc' : '#777'}
                secureTextEntry={true} 
                value={password} 
                onChangeText={setPassword} 
                onFocus={() => setIsFocused2(true)} 
                onBlur={() => setIsFocused2(false)} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;