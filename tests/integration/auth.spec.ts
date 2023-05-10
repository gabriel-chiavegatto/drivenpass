import app, { init } from "../../src/app";
import supertest from "supertest";
import faker from "@faker-js/faker";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";

beforeAll(async () => {
    await init();
})
beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /user', () => {

    it('should respond with status 401 when body is not given', async () => {
        const response = await server.post('/user');
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it('should respond with status 401 when body is not valid', async () => {
        const body = { email: faker.lorem.work() }
        const response = await server.post('/user').send(body)

        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })
})



