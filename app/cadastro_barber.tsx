import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput, Image, TouchableOpacity } from 'react-native';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const senhaRef = useRef<TextInput>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [street, setStreet] = useState('');
  const [senha, setSenha] = useState('');
  const [number, setnumber] = useState('');
  const { addData, getData } = useFirebase('barbers');

  const handleSubmit = async () => {
    if (!name) return Alert.alert('Coloque seu nome', 'Sua anta');
    if (!cpf) return Alert.alert('Coloque seu CPF', 'Sua anta');

    const userArr = await getData(cpf);

    if (userArr.length === 0) {
      await addData({ name, cpf, senha, contact: Number(number), street });
      Alert.alert('Criado com sucesso!');
      setCpf('');
      setName('');
      setSenha('');
      setStreet('');
      setnumber('');
    } else {
      setCpf('');
      setName('');
      setSenha('');
      setStreet('');
      setnumber('');
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

        <View className="flex justify-center gap-4 rounded-t-3xl bg-red-500 p-10 ">
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
            <View className="flex flex-row gap-2">
              <TextInput
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                ref={cpfRef}
                className="flex-1 rounded-lg border-2 border-white px-3 text-lg text-white"
                keyboardType="numeric"
                placeholder="Seu CPF"
                inputMode="numeric"
                onSubmitEditing={() => streetRef.current?.focus()}
                onChangeText={setCpf}
                value={cpf}
              />
              <TextInput
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                ref={streetRef}
                className="flex-1 rounded-lg border-2 border-white px-3 text-lg text-white"
                placeholder="Sua Rua"
                onSubmitEditing={() => senhaRef.current?.focus()}
                onChangeText={setStreet}
                value={street}
              />
            </View>
            <View className="flex flex-row gap-2">
              <TextInput
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                ref={senhaRef}
                className="flex-1 rounded-lg border-2 border-white px-3 text-lg text-white"
                placeholder="Sua senha"
                secureTextEntry
                onChangeText={setSenha}
                value={senha}
              />
              <TextInput
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                ref={senhaRef}
                className="flex-1 rounded-lg border-2 border-white px-3 text-lg text-white"
                placeholder="Seu contato"
                inputMode="numeric"
                keyboardType="numeric"
                onChangeText={setnumber}
                value={number}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} className="w-full rounded-lg bg-white py-3">
            <Text className="text-center text-xl text-black">Registrar</Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-between">
            <Text className="text-white">Já possui uma conta? </Text>
            <Link href="/logar_barber" replace className="flex justify-end text-white underline">
              Entrar
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default Create;
