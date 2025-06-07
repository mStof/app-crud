import { BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';

const DrawerLayout = () => {

useEffect(() => {
  const onBackPress = () => true;
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress
  );

  return () => backHandler.remove();
}, []);

  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Barbeiros Proximos',
          headerTitleAlign: 'center',
          drawerLabel: 'Barbeiros proximos',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person-search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="update"
        options={{
          headerTitle: 'Conta',
          headerTitleAlign: 'center',
          drawerLabel: 'Conta',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
        <Drawer.Screen
          name="create"
          options={{
            headerTitle: 'Criar',
            headerTitleAlign: 'center',
            drawerLabel: 'Deslogar',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="logout" size={size} color={color} />
            ),
          }}
        />
      <Drawer.Screen
        name="remove"
        options={{
          headerTitle: 'Remover',
          headerTitleAlign: 'center',
          drawerLabel: ''
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
