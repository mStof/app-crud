import { Link, router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { usePersist } from '~/context/usePersist';
import { useSQLite } from '~/db/sqlite/useSQLite';

import { useFirebase } from '~/db/useFirebase';

const Create = () => {
  const senhaRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);

  const [inputFocus, setInputFocus] = useState(false);
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const { getData } = useFirebase("barbers");
  const { setUserPersisted } = usePersist();
  const { createUser } = useSQLite();

  const handleSubmit = async () => {
    if (!cpf) return Alert.alert('Coloque seu CPF', 'Sua anta');
    if (!senha) return Alert.alert('Coloque sua senha', 'Sua anta');

    const userArr = await getData(cpf);

    if (userArr.length === 0) {
      setCpf('');
      setSenha('');
      return Alert.alert('Info erradas');
    }

    const user = userArr[0];
    console.log(user);

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

  return (
    <>
      <View className="flex flex-1 justify-end gap-2 bg-[#FFFFFF]">
        <Image
          source={require('../assets/barberShop/barberLogo.jpg')}
          className="absolute inset-0 h-1/2 w-full aria-[small=true]:h-1/3"
          resizeMode="contain"
          aria-small={inputFocus}
        />

        <View className="flex justify-center gap-2 rounded-t-3xl bg-red-500 p-10">
          <Text className="mb-8 text-center text-2xl text-white">Entre e sinta-se a vontade</Text>

          <TextInput
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            ref={cpfRef}
            keyboardType="numeric"
            className="w-full rounded-lg border-2 border-white px-3 text-lg text-white"
            placeholder="Seu CPF"
            inputMode="numeric"
            onChangeText={setCpf}
            value={cpf}
          />

          <TextInput
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            ref={senhaRef}
            className="mb-4 w-full rounded-lg border-2 border-white px-3 text-lg text-white"
            placeholder="Sua senha"
            secureTextEntry
            onChangeText={setSenha}
            value={senha}
          />

          <TouchableOpacity onPress={handleSubmit} className=" w-full rounded-lg bg-white py-3">
            <Text className="text-center text-xl text-black">Entrar</Text>
          </TouchableOpacity>

          <View className=" flex flex-row  justify-between">
            <Text className="text-white">Não possui uma conta?</Text>
            <Link
              href="/cadastro_barber"
              dismissTo
              className="flex justify-end text-white underline">
              Cadastrar-se
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default Create;
