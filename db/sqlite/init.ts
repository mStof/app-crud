import { type SQLiteDatabase } from 'expo-sqlite';

export const initSQLite = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS userss (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cpf TEXT NOT NULL,
      senha TEXT NOT NULL
    )
    `)
};
