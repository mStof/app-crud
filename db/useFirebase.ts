import { get, onValue, push, ref, remove, set, update } from 'firebase/database';
import { dbFB } from 'firebaseConfig';
import { Alert } from 'react-native';
import { UserFB } from '~/types/user';

type AddData = UserFB;
type SelectData = React.Dispatch<React.SetStateAction<UserFB[]>> | (() => void);
type UpdateData = UserFB;
type GetData = string | undefined;
type RemoveData = string;

const useFirebase = () => {
  if (!dbFB) console.log('dbFb is ', dbFB);
  const listRef = ref(dbFB, 'users');

  const addData = (data: AddData) => {
    const userRef = push(listRef);
    const result = set(userRef, data);
    console.log('addDataResult->', result);
  };

  const removeData = async (cpfDeletable: RemoveData) => {
    const user = await getData(cpfDeletable);
    if (!user[0]) return Alert.alert('Nada', 'Nenhum usuário encontrado');

    const { cpf, name, id } = user[0];
    Alert.alert('Deletar este usuario', `Deletar o usuário?\nCPF:${cpf}\nNome:${name}`, [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Deletar',
        onPress: () => {
          remove(ref(dbFB, `users/${id}`));
        },
      },
    ]);
  };

  const updateData = async (updates: UpdateData) => {
    const data = await getData(updates.cpf);
    console.log(data);

    console.log(data[0]);
    if (!data[0]) return false;

    const { id } = data[0];

    update(ref(dbFB, `users/${id}`), { cpf: updates.cpf, name: updates.name });
    return true;
  };

  const selectDataListener = (set: SelectData) => {
    const query = onValue(listRef, (snapshot) => {
      const hasData = snapshot.exists();
      if (!hasData) return console.log('não tem data');

      const obj = snapshot.toJSON() as object;
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const newArr = [];
      for (let i = 0; i < keys.length; i++) {
        newArr.push({ id: keys[i], ...values[i] });
      }
      set(newArr);
    });
    return query;
  };

  const getData = async (id?: GetData) => {
    const result = await get(listRef);
    const obj = result.toJSON();
    if (obj === null) return [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const newArr: UserFB[] = [];
    for (let i = 0; i < keys.length; i++) {
      newArr.push({ id: keys[i], ...values[i] });
    }
    if (!id) return newArr;
    const user = newArr.filter(({ cpf }) => cpf === id);
    return user;
  };

  return {
    addData,
    removeData,
    updateData,
    selectDataListener,
    getData,
  };
};

export { useFirebase };
