import { View, Text, Button, Alert } from 'react-native'
import {useState} from 'react'

import {useDatabase} from "db/useDatabase"

const Remove = () => {
  const [cpf, setCpf] = useState("");
  const { deleteUsers } = useDatabase();
  const handleDelete = async () => {
    if(!cpf) return;
    const result = await deleteUsers(cpf)
    if(result?.length === 1) return Alert.alert("cpf deletado com sucesso")
    if(result?length > 1) return Alert.alert("erro ao deletar, tente novamente")
  } 
  return (
    <View className="flex flex-1 px-8 justify-center">
      <TextInput
        onChangeText={setCpf}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={cpf}
      />
      <Button onPress={handleDelete}>Remove</Button>
    </View>
  )
}

export default Remove