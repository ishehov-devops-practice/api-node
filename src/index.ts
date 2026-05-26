import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Demo endpoint to fetch active incident alertss
app.get(
  '/api/node/incidents',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM incidents ORDER BY updated_at DESC'
      );
      res.json({ status: 'success', data: rows });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ status: 'error', message: 'Database query failed' });
    }
  }
);

// Healthcheck endpoint
app.get('/api/node/health', (req: Request, res: Response): void => {
  res.json({ status: 'healthy', service: 'api-node' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node TypeScript API successfully listening on port ${PORT}`);
});

export default app;
