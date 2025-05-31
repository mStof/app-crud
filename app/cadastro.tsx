import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const { addData } = useFirebase();

  const handleSubmit = async () => {
    if (!name) return;
    if (!cpf) return;

    await addData({ name, cpf });
    Alert.alert('Criado com sucesso!');
    setCpf("")
    setName("")
  };

  return (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Cria seu registro no app</Text>
      <TextInput
        returnKeyType="next"
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu nome"
        onSubmitEditing={() => cpfRef.current?.focus()}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        ref={cpfRef}
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu CPF"
        onChangeText={setCpf}
        value={cpf}
      />
      <Button onPress={handleSubmit} title="Registrar" />
      <Link href="/cadastro" className='self-end text-sky-800 underline'>Logar</Link>
      
    </View>
  );
};

export default Create;
