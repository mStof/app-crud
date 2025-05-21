import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import * as schema from './schema';

export const useDatabase = () => {
  const database = useSQLiteContext();
  const db = drizzle(database, { schema });

  const getUsers = async () => {
    try {
      const result = await db.select().from(schema.usersTable);
      console.log('result ->');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUsers = async (cpf: string) => {
    try {
      const result = await db
        .delete(schema.usersTable)
        .where(eq(schema.usersTable.cpf, cpf))
        .returning();
      console.log('result ->');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const createUsers = async (data: typeof schema.usersTable.$inferInsert) => {
    try {
      const result = await db.insert(schema.usersTable).values(data).returning();
      console.log('result ->');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUsers = async (data: typeof schema.usersTable.$inferInsert) => {
    try {
      const result = await db
        .update(schema.usersTable)
        .set({ cpf: data.cpf, name: data.name })
        .where(eq(schema.usersTable.cpf, data.cpf))
        .returning();
      console.log('result ->');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUsers,
    deleteUsers,
    createUsers,
    updateUsers,
  };
};
