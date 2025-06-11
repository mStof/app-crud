import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { usePersist } from '~/context/usePersist';
import { useSQLite } from '~/db/sqlite/useSQLite';
import { useFirebase } from '~/db/useFirebase';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { getData } = useFirebase();
  const { deleteUser, selectUser } = useSQLite();
  const { setUserPersisted } = usePersist();

  useEffect(() => {
    const loginFast = async () => {
      console.log('loginFast');
      const data = await selectUser();
      console.log(data);
      if (data === undefined || data.length === 0) return setLoading(false);
      const userPersist = data[0];
      const userArr = await getData(userPersist.cpf);

      if (userArr.length === 0) {
        setLoading(false);
        return await deleteUser();
      }

      const user = userArr[0];
      if (user.cpf !== userPersist.cpf || user.senha !== userPersist.senha) {
        setLoading(false);
        await deleteUser();
        return;
      }

      console.log('loginFast -> Success');
      setUserPersisted(userPersist);

      return router.push('/(drawer)');
    };
    loginFast();
  }, []);
  
  return loading ? (
    <View className="flex flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    <View className="flex flex-1 justify-end gap-16 bg-stone-100 px-8 py-16">
      <View className="flex gap-2">
        <Ionicons name="cut-outline" size={64} />
        <Text className="text-4xl">Bem vindo a </Text>
        <Text className="text-4xl">Barbearia do Zé</Text>
      </View>
      <View className="flex w-full flex-row justify-between">
        <TouchableOpacity
          onPress={() => router.push('/logar')}
          activeOpacity={0.5}
          style={{ elevation: 2 }}
          className="flex aspect-square w-[45%] justify-between rounded-lg bg-blue-700 p-4">
          <Ionicons name="person-circle-outline" color="white" size={44} />
          <View className="ml-1">
            <Text className="text-xl text-white">Sou</Text>
            <Text className="text-xl font-bold text-white">Um cliente</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/logar_barber')}
          activeOpacity={0.5}
          style={{ elevation: 2 }}
          className="flex aspect-square w-[45%] justify-between rounded-lg bg-red-700 p-4">
          <Ionicons name="cut-sharp" color="white" size={44} />
          <View className="ml-1">
            <Text className="text-xl text-white">Sou</Text>
            <Text className="text-xl font-bold text-white">Um Barbeiro</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
