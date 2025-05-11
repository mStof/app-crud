import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, View } from 'react-native';

import { useDatabase } from '~/db/useDatabase';
import {usersTable} from "~/db/schema";

export default function Home() {
  const [list, setList] = useState<typeof usersTable.$inferSelect[]>();
  const {getUsers} = useDatabase()

  const handleUpdate = async () => {
    const result = await getUsers();
    if (!result) return
    setList(result);
  }

  return (
   <View>
    <Button title="carregar lista" onPress={handleUpdate}/>
    <View>

    {
      list?.map(({cpf,name}) => (
        <Text>{cpf} - {name}</Text>
      ))
    }
    </View>
   </View>
  );
}
