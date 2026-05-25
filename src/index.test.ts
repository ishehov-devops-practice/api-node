import request from 'supertest';
import app from './index';

describe('API sanity tests', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/api/node/health');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('service', 'api-node');
  });
});
