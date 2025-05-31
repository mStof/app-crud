import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, ActivityIndicator, BackHandler } from 'react-native';

import { useFirebase } from '~/db/useFirebase';
import { UserFB } from '~/types/user';

export default function Home() {
  BackHandler.addEventListener("hardwareBackPress", () => null);
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<UserFB[]>([]);
  const { selectDataListener } = useFirebase();
  useEffect(() => selectDataListener(setList), []);
  const filterList = list.filter((user) => user.cpf.includes(filter));

  return (
    <View className="flex flex-1 justify-center gap-8 px-8 pt-8">
      <TextInput
        onChangeText={setFilter}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={filter}
      />
      {/* <Button title="carregar lista2" onPress={handleUpdate} /> */}
      {list.length ? (
        <ScrollView className="pb-8" contentContainerClassName="pb-8">
          {filterList.length
            ? filterList?.map(({ cpf, name, id }) => (
                <View key={id} className="flex w-full flex-row justify-between">
                  <Text className="text-2xl">
                    CPF:<Text className="font-bold ">{cpf}</Text>
                  </Text>
                  <Text className="text-center text-2xl">
                    Name:<Text className="font-bold ">{name}</Text>
                  </Text>
                </View>
              ))
            : list?.map(({ cpf, name, id }) => (
                <View key={id} className="flex w-full flex-row justify-between">
                  <Text className="text-2xl">
                    CPF:<Text className="font-bold ">{cpf}</Text>
                  </Text>
                  <Text className="text-center text-2xl">
                    Name:<Text className="font-bold ">{name}</Text>
                  </Text>
                </View>
              ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  );
}
