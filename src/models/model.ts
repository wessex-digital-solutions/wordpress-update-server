import { QueryResult, QueryResultRow } from 'pg';
import { pool } from './pool';

class Model {
  private pool;
  private table;

  constructor(table: string) {
    this.pool = pool;
    this.table = table;
    /* istanbul ignore next */
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client ${client}`
    );
  }

  async select(
    columns: string,
    clause?: string
  ): Promise<QueryResult<QueryResultRow>> {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += ` ${clause}`;
    return this.pool.query(query);
  }

  async insertWithReturn(
    columns: string,
    values: string
  ): Promise<QueryResult<QueryResultRow>> {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING id, ${columns}`;
    return this.pool.query(query);
  }

  // update record by id
  async update(
    id: string,
    data: Record<string, unknown>,
    columns: string
  ): Promise<QueryResult<QueryResultRow>> {
    let setData = '';
    let i = 1;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        setData += `${key} = '${data[key]}'${
          Object.keys(data).length > i ? ', ' : ''
        }`;
      }
      i++;
    }
    const query = `UPDATE ${this.table} SET ${setData}WHERE id = ${id} RETURNING id, ${columns}`;
    return this.pool.query(query);
  }

  // delete record by id
  async delete(id: string): Promise<QueryResult<QueryResultRow>> {
    const query = `DELETE FROM ${this.table} WHERE id = ${id}`;
    return this.pool.query(query);
  }
}

export default Model;
