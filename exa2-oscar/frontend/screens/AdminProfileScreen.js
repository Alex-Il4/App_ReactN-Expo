import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AdminProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Image 
                    source={require('../../../assets/medico.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.title}>Perfil del Administrador</Text>

                <View style={styles.infoField}>
                    <Icon name="user" size={20} color="#0d70ad" style={styles.fieldIcon} />
                    <Text style={styles.fieldLabel}>Nombre: </Text>
                    <Text style={styles.fieldValue}>Samuel Blanco</Text>
                </View>

                <View style={styles.infoField}>
                    <Icon name="briefcase" size={20} color="#0d70ad" style={styles.fieldIcon} />
                    <Text style={styles.fieldLabel}>Rol: </Text>
                    <Text style={styles.fieldValue}>Administrador</Text>
                </View>

                <View style={styles.infoField}>
                    <Icon name="mail" size={20} color="#0d70ad" style={styles.fieldIcon} />
                    <Text style={styles.fieldLabel}>Correo: </Text>
                    <Text style={styles.fieldValue}>samuel@clinica.com</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => {  }}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#C2B9B6', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20 
    },
    cardContainer: { 
        width: '100%', 
        maxWidth: 400,  
        backgroundColor: '#ffffff', 
        borderRadius: 20, 
        padding: 30, 
        paddingTop: 80, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
        elevation: 5, 
        position: 'relative'
    },
    profileImage: { 
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        position: 'absolute', 
        top: -60, 
        borderWidth: 4, 
        borderColor: '#ffffff', 
        backgroundColor: '#e6f0ff' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#0d70ad', 
        marginBottom: 30, 
        marginTop: 20, 
        textAlign: 'center' 
    },
    infoField: { width: '100%', 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        padding: 15, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    fieldIcon: { 
        marginRight: 10 
    },
    fieldLabel: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#333' 
    },
    fieldValue: { 
        fontSize: 16, 
        color: '#555' 
    },
    button: { 
        width: '100%', 
        height: 50, 
        backgroundColor: '#0d70ad', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20 
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
});

export default AdminProfileScreen;