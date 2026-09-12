import { query } from '../db.js';

export async function flagAnomalies(userId: string, threshold: number) {
  const result = await query(
    'SELECT * FROM transactions WHERE user_id = $1 AND amount > $2 ORDER BY amount DESC',
    [userId, threshold]
  );
  return result.rows;
}
