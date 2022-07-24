const request = require("supertest");
// const { app } = require('../server.js');
import { app } from "../server.js";
// GUIDE: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// JEST MATCHERS: https://jestjs.io/docs/using-matchers

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
