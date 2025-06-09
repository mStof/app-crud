import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput, ActivityIndicator, Image} from 'react-native';
import { usePersist } from '~/context/usePersist';
import { useSQLite } from '~/db/sqlite/useSQLite';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const senhaRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);
  const { getData } = useFirebase();
  const { setUserPersisted } = usePersist();
  const { createUser, selectUser, deleteUser } = useSQLite();

  useEffect(() => {
    const loginFast = async () => {
      console.log('loginFast');
      const data = await selectUser();
      console.log(data);
      if (data === undefined || data.length === 0) return setLoading(false);
      const userPersist = data[0];
      const userArr = await getData(userPersist.cpf);

      if (userArr.length === 0) {
        setLoading(false);
        return await deleteUser();
      }

      const user = userArr[0];
      if (user.cpf !== userPersist.cpf) {
        setLoading(false);
        return await deleteUser();
      }

      console.log('loginFast -> Success');
      setUserPersisted(userPersist);

      return router.push('/(drawer)');
    };
    loginFast();
  }, []);

  const handleSubmit = async () => {
    if (!cpf) return Alert.alert("Coloque seu CPF", "Sua anta");
    if (!senha) return Alert.alert("Coloque sua senha", "Sua anta");

    const userArr = await getData(cpf);

    if (userArr.length === 0) {
      setCpf('');
      setSenha('');
      return Alert.alert('Info erradas');
    }

    const user = userArr[0];
    if (user.senha !== senha) {
      setCpf('');
      setSenha('');
      return Alert.alert('Info erradas');
    }

    setCpf('');
    setSenha('');
    setUserPersisted(user);
    await createUser(user);

    return router.push('/(drawer)');
  };

  return loading ? (
    <View className="flex flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    <>

      <View className="flex flex-1 justify-center gap-2 px-16 bg-[#FFFFFF]">

        <Image
          source={require('../assets/barberShop/barberLogo.jpg')} 
          className='w-full h-[50%]'
          resizeMode='contain'
        />

        <Text className="mb-8 text-center text-2xl">Logar no app</Text>

        <TextInput
          ref={cpfRef}
          keyboardType="numeric"
          className="w-full rounded-lg border-2 px-3 text-lg"
          placeholder="Seu CPF"
          onChangeText={setCpf}
          value={cpf} />
        <TextInput
          ref={senhaRef}
          className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
          placeholder="Sua senha"
          keyboardType='visible-password'
          onChangeText={setSenha}
          value={senha} />
        <Button onPress={handleSubmit} title="Entrar" />
        <View className=" flex flex-row ">
          <Text>Não possui uma conta? </Text>
          <Link href="/cadastro" className=" text-sky-800 underline flex justify-end">
            Cadastrar-se
          </Link>
        </View>
      </View>
    </>

  );
};

export default Create;
