import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessagesTable,
} from './queries';

export const executeQueryArray = async (arr: string[]): Promise<void> =>
  new Promise<void>((resolve) => {
    const stop = arr.length;
    arr.forEach(async (query, i) => {
      await pool.query(query);
      if (i + 1 === stop) resolve();
    });
  });

export const dropTables = (): Promise<void> =>
  executeQueryArray([dropMessagesTable]);
export const createTables = (): Promise<void> =>
  executeQueryArray([createMessagesTable]);
export const insertIntoTables = (): Promise<void> =>
  executeQueryArray([insertMessages]);
export const resetTables = (): Promise<void> =>
  executeQueryArray([dropMessagesTable, createMessagesTable, insertMessages]);
