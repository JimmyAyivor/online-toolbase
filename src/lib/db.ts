import { Pool, QueryResultRow } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[],
): Promise<T[]> {
  const { rows } = await pool.query<T>(sql, params);
  return rows;
}