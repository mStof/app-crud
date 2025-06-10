import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput, Image } from 'react-native';

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

    <>

      <View className="flex flex-1 justify-center gap-2 bg-[#FFFFFF] w-[100%]">

        <Image
          source={require('../assets/barberShop/barberLogo.jpg')} 
          className='w-full h-[50%]'
          resizeMode='contain'
        />

        <View className='flex flex-1 justify-center gap-2 p-10 bg-blue-500 rounded-t-[10%] w-screen '>

          <Text className="mb-8 text-center text-2xl text-white">Cria seu registro no app</Text>

          <TextInput
            returnKeyType="next"
              className="mb-4 w-full rounded-lg border-2 px-3 text-lg text-white border-white"
            placeholder="Seu nome"
            onSubmitEditing={() => cpfRef.current?.focus()}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            ref={cpfRef}
              className="mb-4 w-full rounded-lg border-2 px-3 text-lg text-white border-white"
            keyboardType="numeric"
            placeholder="Seu CPF"
            onSubmitEditing={() => senhaRef.current?.focus()}
            onChangeText={setCpf}
            value={cpf}
          />
          <TextInput
            ref={senhaRef}
              className="mb-4 w-full rounded-lg border-2 px-3 text-lg text-white border-white"
            placeholder="Sua senha"
            onChangeText={setSenha}
            value={senha}
          />
          <Button onPress={handleSubmit} title="Registrar" />
            <View className=" flex flex-row " >
              <Text>Já possui uma conta? </Text>
              <Link href="/" className=" text-sky-800 underline flex justify-end text-white">
                Entrar
              </Link>
            </View>
        </View>
        
      </View>
    </>

  );
};

export default Create;
