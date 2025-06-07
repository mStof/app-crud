import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const senhaRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const { addData, getData } = useFirebase();

  const handleSubmit = async () => {
    if (!name) return Alert.alert("Coloque seu nome", "Sua anta");
    if (!cpf) return Alert.alert("Coloque seu CPF", "Sua anta");


    const userArr = await getData(cpf);

    if (userArr.length === 0) {

      await addData({ name, cpf, senha });
      Alert.alert('Criado com sucesso!');
      setCpf("")
      setSenha("")
      setName("")

    }else{
      setCpf("")
      setSenha("")
      setName("")
      Alert.alert('já existe um usuario com esse CPF');
    }

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
        className=" w-full rounded-lg border-2 px-3 text-lg"
        keyboardType="numeric"
        placeholder="Seu CPF"
        onSubmitEditing={() => senhaRef.current?.focus()}
        onChangeText={setCpf}
        value={cpf}
      />
      <TextInput
        ref={senhaRef}
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Sua senha"
        onChangeText={setSenha}
        value={senha}
      />
      <Button onPress={handleSubmit} title="Registrar" />
      <Link href="/" className='self-end text-sky-800 underline'>Logar</Link>
      
    </View>
  );
};

export default Create;
