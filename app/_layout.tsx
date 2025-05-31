import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {SQLiteProvider} from "expo-sqlite"

import { initSQLite } from '~/db/sqlite/init';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {

//   useEffect(() => {
//   BackHandler.addEventListener('backPress', () => true)
//   return () => BackHandler.removeEventListener('backPress', () => true)
// }, [])

  return (
    <SQLiteProvider databaseName='localDB.db' onInit={initSQLite}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
