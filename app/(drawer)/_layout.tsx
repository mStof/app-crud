import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'index',
          headerTitleAlign: 'center',
          drawerLabel: 'Pesquisar',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person-search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="create"
        options={{
          headerTitle: 'Criar',
          headerTitleAlign: 'center',
          drawerLabel: 'Criar',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person-add-alt-1" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="update"
        options={{
          headerTitle: 'index',
          headerTitleAlign: 'center',
          drawerLabel: 'Atualizar',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="lock-person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="remove"
        options={{
          headerTitle: 'index',
          headerTitleAlign: 'center',
          drawerLabel: 'Remover',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person-remove" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
