import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
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
          headerTitle: 'Conta',
          headerTitleAlign: 'center',
          drawerLabel: 'Conta',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="person" size={size} color={color} />
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
