import '../global.css';

import migration from 'drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const expo = openDatabaseSync('database.db', { useNewConnection: true });
const db = drizzle(expo);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const { success, error } = useMigrations(db, migration);

  if (error) {
    return (
      <View>
        <Text>
          {error.message} - {error.name}
        </Text>
      </View>
    );
  }
  if (!success) {
    return <ActivityIndicator className="flex-1 items-center justify-center" />;
  }

  return (
    <SQLiteProvider databaseName="database.db">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
