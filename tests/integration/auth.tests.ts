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

    it('should respond with status 422 when body is not given', async () => {
        const response = await server.post('/user');
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    })
})



