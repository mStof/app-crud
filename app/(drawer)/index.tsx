import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  BackHandler,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useFirebase } from '~/db/useFirebase';
import { UserFB } from '~/types/user';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { BarberFB } from '~/types/barber';
import { Link } from 'expo-router';

export default function Home() {
  BackHandler.addEventListener('hardwareBackPress', () => null);
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<BarberFB[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { selectDataListener } = useFirebase('barbers');
  useEffect(() => selectDataListener(setList), []);
  const filterList = list.filter((user) => user.cpf.includes(filter));

  const onChange = (e: DateTimePickerEvent, dateSelected: Date | undefined) => {
    setDate(dateSelected);
    console.log(date);
  };
  const handleTime = () => {
    if (!date) return console.log('error');

    DateTimePickerAndroid.open({
      value: date,
      mode: 'time',
      onChange,
      is24Hour: true,
    });
  };

  return (
    <View className="flex gap-4 px-8 py-8">
      <TextInput
        onChangeText={setFilter}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Pesquisar"
        value={filter}
      />
      <View className="flex gap-1">
        {/* <TouchableOpacity onPress={handleTime} className=" w-full rounded-lg bg-blue-500 py-3">
          <Text className="text-center text-xl text-white">Escolha uma hora</Text>
        </TouchableOpacity>
        <Text>Hora selecionada: {date ? date.toLocaleTimeString('pt') : ''}</Text> */}
      </View>
      {list.length ? (
        <ScrollView contentContainerClassName="flex gap-4" className="">
          {filterList.length
            ? filterList?.map(({ name, id, contact, street }, index) => (
                <View
                  key={id}
                  className={`${index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'} flex w-fit flex-row justify-between rounded-lg border-2 px-4 py-3`}>
                  <View className="flex  justify-between gap-2">
                    <Text className="text-xl text-white font-bold">{name}</Text>
                    <Text className="text-base text-white">{street}</Text>
                  </View>
                  <View className="flex justify-between">
                    <Ionicons
                      onPress={() => Linking.openURL('https://wa.me/' + contact)}
                      className="text"
                      size={20}
                      color="white"
                      name="logo-whatsapp"
                    />
                    <Ionicons
                      onPress={() => Linking.openURL('tel:' + contact)}
                      className="text"
                      size={20}
                      color="white"
                      name="call-sharp"
                    />
                  </View>
                </View>
              ))
            : list?.map(({ cpf, name, street, id, contact }, index) => (
                <View
                  key={id}
                  className={`${index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'} flex w-fit flex-row justify-between rounded-lg border-2 px-4 py-3`}>
                  <View className="flex  justify-between gap-2">
                    <Text className="text-xl text-white font-bold">{name}</Text>
                    <Text className="text-base text-white">{street}</Text>
                  </View>
                  <View className="flex justify-between">
                    <Ionicons
                      onPress={() => Linking.openURL('https://wa.me/' + contact)}
                      className="text"
                      size={20}
                      color="white"
                      name="logo-whatsapp"
                    />
                    <Ionicons
                      onPress={() => Linking.openURL('tel:' + contact)}
                      className="text"
                      size={20}
                      color="white"
                      name="call-sharp"
                    />
                  </View>
                </View>
              ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  );
}

{
  /* <View className="flex flex-1 justify-center gap-8 px-8 pt-8">
      <TextInput
        onChangeText={setFilter}
        className="w-full rounded-lg border-2 px-3 text-lg"
        placeholder="Seu cpf"
        value={filter}
      />
      <Button title="carregar lista2" onPress={handleUpdate} />
      {list.length ? (
        <ScrollView className="pb-8" contentContainerClassName="pb-8">
          {filterList.length
            ? filterList?.map(({ cpf, name, id }) => (
                <View key={id} className="flex w-full flex-row justify-between">
                  <Text className="text-2xl">
                    CPF:<Text className="font-bold ">{cpf}</Text>
                  </Text>
                  <Text className="text-center text-2xl">
                    Name:<Text className="font-bold ">{name}</Text>
                  </Text>
                </View>
              ))
            : list?.map(({ cpf, name, id }) => (
                <View key={id} className="flex w-full flex-row justify-between">
                  <Text className="text-2xl">
                    CPF:<Text className="font-bold ">{cpf}</Text>
                  </Text>
                  <Text className="text-center text-2xl">
                    Name:<Text className="font-bold ">{name}</Text>
                  </Text>
                </View>
              ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <View>

      </View>

    </View> */
}
