const request = require('supertest'); //testing http requests
const app = require('../server'); //importing server.js file to be tested
const app = require('../app'); //importing app.js file to be tested

//ensures server stops after testing is complete
afterAll((done) => {
    server.close(done);
});

//test the server is running properly
describe('Server test', () => {

    test('should respond with a status of 200 and hello message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Hello from Vanessa's server");
    });
});
