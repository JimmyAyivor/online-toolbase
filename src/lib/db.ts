import { Pool, QueryResultRow } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Keep public pages responsive if the managed database is unavailable.
  connectionTimeoutMillis: 5_000,
  idleTimeoutMillis: 30_000,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[],
): Promise<T[]> {
  const { rows } = await pool.query<T>(sql, params);
  return rows;
}
