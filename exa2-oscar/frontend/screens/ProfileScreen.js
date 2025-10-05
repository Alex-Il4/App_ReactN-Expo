import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const loadUser = async() => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async() => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
    setUser('');
    setToken('');
    alert('Sesión cerrada');
    return;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#222' : '#C2B9B6',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    cardContainer: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: darkMode ? '#333' : '#ffffff',
      borderRadius: 20,
      padding: 30,
      paddingTop: 40,
      alignItems: 'center',
      elevation: 5,
      position: 'relative',
    },
    profileImage: {
      width: 100,
      height: 120,
      borderRadius: 60,
      position: 'absolute',
      top: -60,
      borderWidth: 4,
      borderColor: darkMode ? '#787878ff' : '#ffffff',
      backgroundColor: '#e6f0ff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: darkMode ? '#b0b0b0ff' : '#0d70ad',
      marginBottom: 10,
      marginTop: 25,
      textAlign: 'center',
    },
    infoField: {
      width: '100%',
      backgroundColor: darkMode ? '#1a1919ff' : '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    fieldIcon: {
      marginRight: 5,
    },
    fieldLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? '#d1d1d1ff' : '#333',
    },
    fieldValue: {
      fontSize: 16,
      color: darkMode ? '#b0b0b0ff' : '#555',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: darkMode ? '#5c5c5cff' : '#0d70adff',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    buttonCerrar: {
      width: '100%',
      height: 50,
      backgroundColor: darkMode ? '#711414ff' : '#851616',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
    },
    buttonText: {
      color: darkMode ? '#d1d1d1ff' : '#ffffffff',
      fontSize: 18,
      fontWeight: 'bold',
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Perfil de Usuario</Text>

        <View style={styles.infoField}>
          <Icon name="user" size={20} color= {darkMode ? '#b0b0b0ff' : "#0d70ad"} style={styles.fieldIcon} />
          <Text style={styles.fieldLabel}>Nombre: </Text>
          <Text style={styles.fieldValue}>Dr. {user}</Text>
        </View>

        <View style={styles.infoField}>
          <Icon name="briefcase" size={20} color= {darkMode ? '#b0b0b0ff' : "#0d70ad"} style={styles.fieldIcon} />
          <Text style={styles.fieldLabel}>Especialidad: </Text>
          <Text style={styles.fieldValue}>Pediatría</Text>
        </View>

        <View style={styles.infoField}>
          <Icon name="mail" size={20} color= {darkMode ? '#b0b0b0ff' : "#0d70ad"} style={styles.fieldIcon} />
          <Text style={styles.fieldLabel}>Correo: </Text>
          <Text style={styles.fieldValue}>{user}@gmail.com</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Icon name="edit" size={20} color="#ffffff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCerrar} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#ffffff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ProfileScreen;
