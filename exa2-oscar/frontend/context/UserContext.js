import React, { useState, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 🚨 NECESARIO PARA EL LOGOUT

// 1. Crear el Contexto
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Estado inicial del usuario (null si no está logueado)
    const [user, setUser] = useState(null); 

    // 🚨 2. Función de Logout Asíncrona 🚨
    const logout = async () => {
        try {
            // Elimina las claves de sesión (ej. token o datos de usuario)
            await AsyncStorage.removeItem('userToken'); 
            
            // Opcional: Si quieres limpiar más datos, añade más removeItem, o usa:
            // await AsyncStorage.clear();

            // Restablece el estado del usuario a null
            setUser(null); 
        } catch (e) {
            console.error("Error al cerrar sesión: ", e);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);