import React, { useState, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    //Estado inicial del usuario que sera null si no esta logueado
    const [user, setUser] = useState(null);

    const updateUser = async (newName) => {
        try {
            //Actualiza asyncstorage con el nuevo nombre
            await AsyncStorage.setItem('user', newName);
            setUser(prevUser => ({
                ...prevUser,
                username: newName,
            }));
        } catch (e) {
            console.error("Error al actualizar el nombre de usuario: ", e);
        }
    };
    //Funcion para cerrar sesion
    const logout = async () => {
        try {
            //Elimina el token de usurio
            await AsyncStorage.removeItem('userToken');
            setUser(null);
        } catch (e) {
            console.error("Error al cerrar sesión: ", e);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);