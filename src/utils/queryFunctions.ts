import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessagesTable,
} from './queries';

export const executeQueryArray = async (queries: string[]): Promise<void> => {
  await Promise.all(queries.map((query) => pool.query(query)));
};

export const dropTables = (): Promise<void> =>
  executeQueryArray([ dropMessagesTable ]);
export const createTables = (): Promise<void> =>
  executeQueryArray([ createMessagesTable ]);
export const insertIntoTables = (): Promise<void> =>
  executeQueryArray([ insertMessages ]);
