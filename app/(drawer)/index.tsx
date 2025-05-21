import { useState } from 'react';
import { Button, View, TextInput, Text } from 'react-native';

import { useDatabase } from '~/db/useDatabase';
import { usersTable } from '~/db/schema';

export default function Home() {
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<(typeof usersTable.$inferSelect)[]>();
  const { getUsers } = useDatabase();
  const filteredList = list?.filter(({ cpf }) => {
    return cpf.includes(filter);
  });

  const handleUpdate = async () => {
    const result = await getUsers();
    if (!result) return;
    setList(result);
  };
console.log(filteredList);

  return (
    <View className="flex flex-1 justify-center px-8 gap-8">
      <TextInput
        onChangeText={setFilter}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={filter}
      />
      <Button title="carregar lista" onPress={handleUpdate} />
      <View>
        {filteredList?.length
          ? filteredList?.map(({ cpf, name }) => (
            <View key={cpf} className='flex flex-row justify-between w-full'>
                <Text className='text-2xl'>
                  CPF:<Text className='font-bold '>{cpf}</Text>
                </Text>
                <Text className='text-center text-2xl'>
                  Name:<Text className='font-bold '>{name}</Text>
                </Text>
              </View>
            ))
          : list?.map(({ cpf, name }) => (
            <View key={cpf} className='flex flex-row justify-between w-full'>
                <Text className='text-2xl'>
                  CPF:<Text className='font-bold '>{cpf}</Text>
                </Text>
                <Text className='text-center text-2xl'>
                  Name:<Text className='font-bold '>{name}</Text>
                </Text>
              </View>
            ))}
      </View>
    </View>
  );
}
