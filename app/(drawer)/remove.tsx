import { View, Button, TextInput } from 'react-native';
import { useState } from 'react';

import { useFirebase } from '~/db/useFirebase';

const Remove = () => {
  const [cpf, setCpf] = useState('');
  // const { deleteUsers } = useDatabase();
  const { removeData } = useFirebase();
  const handleDelete = async () => {
    removeData(cpf);
    setCpf('');
  };
  return (
    <View className="flex flex-1 justify-center gap-8 px-8">
      <TextInput
        onChangeText={setCpf}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={cpf}
      />
      <Button title="Deletar" onPress={handleDelete} />
    </View>
  );
};

export default Remove;
