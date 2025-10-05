import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const navigation = useNavigation();
  const { darkMode, toggleDarkMode } = useTheme(); 


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: darkMode ? '#222' : '#C2B9B6',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: darkMode ? '#b0b0b0ff' : '#393939',
    },
    button: {
      width: '85%',
      height: 60,
      backgroundColor: darkMode ? '#5c5c5cff' : '#0d70ad',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    deleteButton: {
      width: '85%',
      height: 60,
      backgroundColor: darkMode ? '#711414ff' : '#851616',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginBottom: 15
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Administrar') }}>
        <MaterialIcons name="manage-accounts" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="circle-notifications" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Notificaciones</Text>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
            value={notificationsEnabled}
            trackColor={{ false: "#474747ff", true: "#ffffffff" }}
            thumbColor={notificationsEnabled ? "#003296ff" : "#f4f3f4"}
          />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="light-mode" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Tema Oscuro</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <MaterialIcons name="language" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Idioma</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <MaterialIcons name="lock" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <MaterialIcons name="info" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.buttonText}>Acerca de la Aplicación</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <MaterialIcons name="logout" size={24} color="#ffffff" style={{ marginRight: 15 }} />
        <Text style={styles.deleteButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default SettingsScreen;