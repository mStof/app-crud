import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, View, TextInput } from 'react-native';

import { useDatabase } from '~/db/useDatabase';
import {usersTable} from "~/db/schema";

export default function Home() {
  const [filter , setFilter] = useState("")
  const [list, setList] = useState<typeof usersTable.$inferSelect[]>();
  const {getUsers} = useDatabase()
  const filteredList = list?.filter(({cpf}) => { return cpf.includes(filter) })

  const handleUpdate = async () => {
    const result = await getUsers();
    if (!result) return
    setList(result);
  }

  return (
   <View className="flex flex-1 justify-center px-8">
    <Button title="carregar lista" onPress={handleUpdate}/>
    <TextInput
      onChangeText={setFilter}
      className="w-full rounded-lg border-2 px-3 text-lg"
      placeholder="Seu cpf"
      value={filter}
    />
    <View>
    {
      filteredList.length ? filteredList?.map(({cpf,name}) => (
        <Text>{cpf} - {name}</Text>
      )) : list?.map(({cpf,name}) => (
        <Text>{cpf} - {name}</Text>
      ))
    }
    </View>
   </View>
  );
}
