import React, { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { usePersist } from '~/context/usePersist';
import { useSQLite } from '~/db/sqlite/useSQLite';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const { updateData } = useFirebase();
  const { userPersist, setUserPersisted } = usePersist();
  const {createUser,deleteUser} = useSQLite()

  const handleSubmit = async () => {
    if (!name) return;
    if (!cpf) return;
    const result = await updateData({ cpf, name });
    console.log(result);
    
    if (!result) Alert.alert('Nada', 'Nenhum usuário encontrado');
    if (result) Alert.alert('Atualizado com sucesso!');
    setUserPersisted({cpf, name});
    await deleteUser();
    await createUser({cpf, name});

    setCpf('');
    setName('');
  };

  return (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Ola {userPersist.name}!</Text>
      <TextInput
        returnKeyType="next"
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu nome novo"
        onSubmitEditing={() => cpfRef.current?.focus()}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        ref={cpfRef}
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu CPF o mesmo"
        onChangeText={setCpf}
        value={cpf}
      />
      <Button onPress={handleSubmit} title="Atualizar" />
    </View>
  );
};

export default Create;
