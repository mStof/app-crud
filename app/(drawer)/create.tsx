import { useRef } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Create = () => {
  const cpfRef = useRef<TextInput>(null);
  return (
    <View className="flex flex-1 justify-center gap-2 px-16">
      <Text className="mb-8 text-center text-2xl">Cria seu registro no app</Text>
      <TextInput
        returnKeyType="next"
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu nome"
        onSubmitEditing={() => cpfRef.current?.focus()}
      />
      <TextInput
        ref={cpfRef}
        className="mb-4 w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu CPF"
      />
      <Button title="Registrar" />
    </View>
  );
};

export default Create;
