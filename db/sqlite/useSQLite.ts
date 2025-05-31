import { useSQLiteContext } from 'expo-sqlite';
import { UserFB } from '~/types/user';

export const useSQLite = () => {
  const db = useSQLiteContext();

  const createUser = async (data: UserFB) => {
    const statement = await db.prepareAsync('INSERT INTO user (name, cpf) VALUES ($name, $cpf)');
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $cpf: data.cpf,
      });
      return result.lastInsertRowId;
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async () => {
    const statement = await db.prepareAsync('DELETE FROM user WHERE id = 1');
    try {
      const result = await statement.executeAsync();
      return result.lastInsertRowId;
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async () => {
    const query = 'SELECT * FROM user';
    try {
      const result = await db.getAllAsync<UserFB>(query);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return { createUser, selectUser, deleteUser };
};
