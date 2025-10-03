import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './frontend/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';

// Importa todas las pantallas
import LoginScreen from './frontend/screens/LoginScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import AppTabs from './AppNavigation';

// Importa el proveedor de tema
import { ThemeProvider } from './frontend/context/ThemeContext'; 

// SQLite
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './frontend/db/database';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // 1. Proveedor de Tema
    <ThemeProvider>
      {/* 2. Proveedor de Usuario */}
      <UserProvider>
        {/* 3. Proveedor de Base de Datos */}
        <SQLiteProvider databaseName="nombre_db" onInit={initializeDatabase}>
          {/* 4. Contenedor de Navegacion */}
          <NavigationContainer>
            {/* 5. Stack Navigator principal */}
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              {/* 'Main' usa el AppTabs (navegacion de pestañas) como componente */}
              <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
              
              {/* Pantallas secundarias que se navegan desde el Stack principal */}
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SQLiteProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
