import { QueryResult, QueryResultRow } from 'pg';
import { pool } from './pool';

class Model {
  private pool;
  private table;

  constructor(table: string) {
    this.pool = pool;
    this.table = table;
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
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(
    columns: string,
    values: string
  ): Promise<QueryResult<QueryResultRow>> {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING id, ${columns}`;
    return this.pool.query(query);
  }
}

export default Model;
