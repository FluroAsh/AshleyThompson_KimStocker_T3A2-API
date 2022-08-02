const db = require("../models");
const { User } = db;
const jwt = require("jsonwebtoken");

const {
  signUp,
  signIn,
  loginRequired,
  authoriseUser,
} = require("../controllers/auth-controller");



describe("signUp function", () => {
  afterEach(async () => {
    await User.destroy({
      where: { username: "Test_User" },
    });
  });

  test("create user record from form data received", async () => {
    const req = {
      body: {
        firstName: "Test",
        lastName: "Sir",
        username: "Test_User",
        email: "mrtest@mail.com",
        password: "123456",
        password_confirmation: "123456",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await signUp(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    expect(data.username).toEqual("Test_User");
    expect(data.firstName).toEqual("Test");
  });

  test("errors when password does not match password confirmation", async () => {
    const req = {
      body: {
        firstName: "Test",
        lastName: "Sir",
        username: "Test_User",
        email: "mrtest@mail.com",
        password: "123456",
        password_confirmation: "123456abc",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await signUp(req, res);

    expect(status).toHaveBeenCalledWith(422);
    expect(json).toHaveBeenCalledWith({
      error: "Password confirmation does not match password entered",
    });
  });
});

describe("signIn function", () => {
  test("return user details and jwt token when correct credentials received", async () => {
    const req = {
      body: {
        username: "Kim",
        password: "123456",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await signIn(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];

    const { username, firstName, lastName, jwt } = data;

    expect(username).toEqual("Kim");
    expect(firstName).toEqual("Kim");
    expect(lastName).toEqual("Stocker");
    expect(jwt).not.toEqual(undefined);
  });

  test("errors when wrong password received", async () => {
    const req = {
      body: {
        username: "Kim",
        password: "abcdef",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await signIn(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "Username or password is incorrect",
    });
  });

  test("errors when wrong username received", async () => {
    const req = {
      body: {
        username: "NoneExistUsername",
        password: "123456",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await signIn(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "Username or password is incorrect",
    });
  });
});

describe("loginRequired function", () => {
  test("return errors when user not signed in", async () => {
    const req = {};

    const status = jest.fn();
    const json = jest.fn();
    const next = jest.fn();
    const res = { status, json };

    loginRequired(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: "Please sign in to continue" });
  });
});
