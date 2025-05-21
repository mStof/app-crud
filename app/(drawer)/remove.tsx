import { View, Text, Button, Alert, TextInput } from 'react-native'
import {useState} from 'react'

import {useDatabase} from "db/useDatabase"

const Remove = () => {
  const [cpf, setCpf] = useState("");
  const { deleteUsers } = useDatabase();
  const handleDelete = async () => {
    if(!cpf) return;
    const result = await deleteUsers(cpf)
    if(result?.length === 1) return Alert.alert("cpf deletado com sucesso");
    return  Alert.alert("erro ao deletar, tente novamente");
    // if(result?.length 1) return Alert.alert("erro ao deletar, tente novamente");
  } 
  return (
    <View className="flex flex-1 px-8 justify-center gap-8">
      <TextInput
        onChangeText={setCpf}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={cpf}
      />
      <Button title='Deletar' onPress={handleDelete}/>
    </View>
  )
}

export default Remove