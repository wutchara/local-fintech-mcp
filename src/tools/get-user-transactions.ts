import { query } from '../db.js';

export async function getUserTransactions(userId: string) {
  const result = await query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC',
    [userId]
  );
  return result.rows;
}
