import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput, Image, TouchableOpacity } from 'react-native';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const senhaRef = useRef<TextInput>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const { addData, getData } = useFirebase();

  const handleSubmit = async () => {
    if (!name) return Alert.alert('Coloque seu nome', 'Sua anta');
    if (!cpf) return Alert.alert('Coloque seu CPF', 'Sua anta');

    const userArr = await getData(cpf);

    if (userArr.length === 0) {
      await addData({ name, cpf, senha });
      Alert.alert('Criado com sucesso!');
      setCpf('');
      setSenha('');
      setName('');
    } else {
      setCpf('');
      setSenha('');
      setName('');
      Alert.alert('já existe um usuario com esse CPF');
    }
  };

  return (
    <>
      <View className="flex w-[100%] flex-1 justify-end gap-2 bg-[#FFFFFF]">
        <Image
          source={require('../assets/barberShop/barberLogo.jpg')}
          className="absolute inset-0 h-1/2 w-full aria-[small=true]:h-1/5"
          resizeMode="contain"
          aria-small={inputFocus}
        />

        <View className="flex justify-center gap-4 rounded-t-3xl bg-blue-500 p-10 ">
          <Text className="mb-2 text-center text-2xl text-white">Cria seu registro no app</Text>
          <View className="flex gap-4">
            <TextInput
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              returnKeyType="next"
              className="w-full rounded-lg border-2 border-white px-3 text-lg text-white"
              placeholder="Seu nome"
              onSubmitEditing={() => cpfRef.current?.focus()}
              onChangeText={setName}
              value={name}
            />
            <TextInput
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              ref={cpfRef}
              className="w-full rounded-lg border-2 border-white px-3 text-lg text-white"
              keyboardType="numeric"
              placeholder="Seu CPF"
              inputMode="numeric"
              onSubmitEditing={() => senhaRef.current?.focus()}
              onChangeText={setCpf}
              value={cpf}
            />
            <TextInput
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              ref={senhaRef}
              className="w-full rounded-lg border-2 border-white px-3 text-lg text-white"
              placeholder="Sua senha"
              secureTextEntry
              onChangeText={setSenha}
              value={senha}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} className="w-full rounded-lg bg-white py-3">
            <Text className="text-center text-xl text-black">Registrar</Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-between">
            <Text className="text-white">Já possui uma conta? </Text>
            <Link href="/logar" replace className="flex justify-end text-white underline">
              Entrar
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default Create;
