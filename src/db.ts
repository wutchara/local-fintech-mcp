import { Pool } from 'pg';

export const pool = new Pool({
  user: 'mcp_user',
  host: 'localhost',
  database: 'fintech_db',
  password: 'mcp_password',
  port: 5433,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
