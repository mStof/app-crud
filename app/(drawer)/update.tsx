import React, { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { usePersist } from '~/context/usePersist';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const { updateData } = useFirebase();
  const { userPersist } = usePersist();

  const handleSubmit = async () => {
    if (!name) return;
    if (!cpf) return;
    const result = await updateData({ cpf, name });
    console.log(result);

    if (!result) Alert.alert('Nada', 'Nenhum usuário encontrado');
    if (result) Alert.alert('Atualizado com sucesso!');
    setCpf('');
    setName('');
  };

  return (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Ola {userPersist.name}</Text>
      <TextInput
        ref={cpfRef}
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu CPF novo ou o mesmo"
        onChangeText={setCpf}
        value={cpf}
      />
      <TextInput
        returnKeyType="next"
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu nome novo"
        onSubmitEditing={() => cpfRef.current?.focus()}
        onChangeText={setName}
        value={name}
      />
      <Button onPress={handleSubmit} title="Registrar" />
    </View>
  );
};

export default Create;
