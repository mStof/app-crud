import { View, Text, Button, Alert } from 'react-native'
import {useState} from 'react'

import {useDatabase} from "db/useDatabase"

const Remove = () => {
  const [cpf, setCpf] = useState("");
  const { deleteUsers } = useDatbase();
  const handleDelete = async () => {
    if(!cpf) return;
    const result = await deleteUsers(cpf)
    if(result) return Alert.alert("cpf deletado com sucesso")
    if(!result) return Alert.alert("erro ao deletar, tente novamente")
  } 
  return (
    <View className="flex flex-1 items-center justify-center">
      <TextInput
        onTextChange={(e) => setCpf(e)}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
      />
      <Button onClick={handleDelete}>Remove</Button>
    </View>
  )
}

export default Remove