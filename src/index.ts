import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface HealthResponse {
  status: string;
  engine: string;
  timestamp: string;
}

app.get('/api/node/health', (req: Request, res: Response) => {
  const response: HealthResponse = {
    status: 'up',
    engine: 'Node.js (TypeScript)',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Node TS REST API listening on port ${PORT}`);
});