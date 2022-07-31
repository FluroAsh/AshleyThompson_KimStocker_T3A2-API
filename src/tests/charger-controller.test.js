const db = require("../models");
const { Charger } = db;
const { createCharger } = require("../controllers/charger-controller");

jest.mock("../services/awsS3-services");

describe("createCharger function", () => {
  beforeEach(async () => {
    await Charger.destroy({
      where: { name: "TEST Create Charger" },
    });
  });

  test("create charger record from form data received", async () => {
    const req = {
      body: {
        name: "TEST Create Charger",
        instructions: "Go to basement and plug in",
        price: "35",
        status: "active",
        plugName: "typeOne",
        username: "Kim",
      },
      file: {
        buffer: "my file contents",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await createCharger(req, res);

    expect(status).toHaveBeenCalledWith(204);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    expect(data.instructions).toEqual("Go to basement and plug in");
    // ...
  });

  test("errors when unknown user specified", async () => {
    const req = {
      body: {
        name: "TEST Create Charger",
        instructions: "Go to basement and plug in",
        price: "35",
        status: "active",
        plugName: "typeOne",
        username: "doesnotexist",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await createCharger(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Unknown user doesnotexist" });
  });

  test("errors when wrong status send", async () => {
    const req = {
      body: {
        name: "TEST Create Charger",
        instructions: "Go to basement and plug in",
        price: "35",
        status: "live",
        plugName: "typeOne",
        username: "Kim",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await createCharger(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: `invalid input value for enum \"enum_Chargers_status\": \"live\"`
});
  });
});
