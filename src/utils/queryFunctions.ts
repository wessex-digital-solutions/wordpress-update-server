import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessagesTable,
} from './queries';

// export const executeQueryArray = async (arr: string[]): Promise<void> =>
//   new Promise<void>((resolve) => {
//     const stop = arr.length;
//     console.log(arr);
//     arr.forEach(async (query, i) => {
//       const response = await pool.query(query);
//       console.log(`query test - ${i + 1} - ${stop}`);
//       if (i + 1 === stop) {
//         console.log('query test - done');
//         resolve();
//       }
//     });
//   });

// executeQueryArray
export const executeQueryArray = async (queries: string[]): Promise<void> => {
  await Promise.all(queries.map((query) => pool.query(query)));
};

export const dropTables = (): Promise<void> =>
  executeQueryArray([dropMessagesTable]);
export const createTables = (): Promise<void> =>
  executeQueryArray([createMessagesTable]);
export const insertIntoTables = (): Promise<void> =>
  executeQueryArray([insertMessages]);
