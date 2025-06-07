import { View, Text, Button } from 'react-native';

import { useSQLite } from '~/db/sqlite/useSQLite';
import { usePersist } from '~/context/usePersist';
import { router } from 'expo-router';

const Create = () => {
  const { deleteUser } = useSQLite();
  const { setUserPersisted } = usePersist();

  const handleLogout = async () => {
    await deleteUser();
    setUserPersisted({ cpf: '', name: '' });
    router.replace('/cadastro');
  };

  return (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Deslogar do aplicativo</Text>
      <Button onPress={handleLogout} title="Deslogar" color="red" />
    </View>
  );
};

export default Create;
