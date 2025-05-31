import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Alert, TextInput, ActivityIndicator } from 'react-native';
import { usePersist } from '~/context/usePersist';
import { useSQLite } from '~/db/sqlite/useSQLite';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(true);
  const { getData } = useFirebase();
  const { setUserPersisted } = usePersist();
  const { createUser, selectUser, deleteUser } = useSQLite();

  useEffect(() => {
    const loginFast = async () => {
      console.log('loginFast');
      const data = await selectUser();
      if (data === undefined) return;
      const userPersist = data[0];
      console.log(data);
      const userArr = await getData(userPersist.cpf);

      if (userArr.length === 0) {
        setLoading(false);
        return await deleteUser();
      }

      const user = userArr[0];
      if (user.name !== userPersist.name) {
        setLoading(false);
        return await deleteUser();
      }

      console.log('loginFast -> Success');

      return router.push('/(drawer)');
    };
    loginFast();
  }, []);

  const handleSubmit = async () => {
    if (!name) return;
    if (!cpf) return;

    const userArr = await getData(cpf);

    if (userArr.length === 0) {
      setCpf('');
      setName('');
      return Alert.alert('Info erradas');
    }

    const user = userArr[0];
    if (user.name !== name) {
      setCpf('');
      setName('');
      return Alert.alert('Info erradas');
    }

    setUserPersisted(user);
    await createUser(user);

    return router.push('/(drawer)');
  };

  return loading ? (
    <View className='flex-1 flex justify-center items-center'>
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Logar no app</Text>
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
        keyboardType="numeric"
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu CPF"
        onChangeText={setCpf}
        value={cpf}
      />
      <Button onPress={handleSubmit} title="Registrar" />
      <Link href="/" className="self-end text-sky-800 underline">
        Cadastrar-se
      </Link>
    </View>
  );
};

export default Create;
