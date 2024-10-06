const request = require('supertest'); //testing http requests
const app = require('../app'); //importing app.js file to be tested

//testing GET route
describe('GET /api/blogs', () => {
    it('should fetch the entire blog content', async () => {
        const res = await request(app).get('/api/blogs');
        expect(Array.isArray(res.body)).toBe(true);
    });
});

