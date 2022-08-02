const db = require("../models");
const { Charger } = db;
const {
  createCharger,
  getCharger,
  updateCharger,
  deleteCharger,
  getChargers,
  getMyChargers,
  updateChargerStatus,
  searchChargersLocation,
  getChargersWithUrl
} = require("../controllers/charger-controller");

jest.mock("../services/awsS3-services", () => ({
  getSignedS3Url: () => "imageUrl",
  uploadImageToS3: () => {},
}));

// TODO: TEST WHEN DB or Internal server down for all tests

describe("createCharger function", () => {
  afterEach(async () => {
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
      user: {
        username: "Kim"
      }
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await createCharger(req, res);

    expect(status).toHaveBeenCalledWith(201);
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

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "Unknown user doesnotexist" });
  });

  test("errors when wrong status sent", async () => {
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
    expect(json).toHaveBeenCalledWith({
      error: `invalid input value for enum \"enum_Chargers_status\": \"live\"`,
    });
  });

  // test("send error when server is down", async () => {
  //   const req = {
  //     body: {
  //       name: "TEST Create Charger",
  //       instructions: "Go to basement and plug in",
  //       price: "35",
  //       status: "pending",
  //       plugName: "typeOne",
  //       username: "Kim",
  //     },
  //   };

  //   const status = jest.fn();
  //   const json = jest.fn();
  //   const res = { status, json };

  //   jest.mock("../utils/auth-utils", () => ({
  //     findUser: () => new Error("Async error message"),
  //   }));

  //   await createCharger(req, res);

  //   expect(status).toHaveBeenCalledWith(500);
  //   expect(json).toHaveBeenCalledWith({
  //     error: "Server error",
  //   });
  // });
});

describe("getCharger function", () => {
  test("return a charger with a valid id", async () => {
    const req = {
      params: { id: "1" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getCharger(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    expect(data.UserId).toEqual(1);
    expect(data.name).toEqual("Super Charger Test 1");
    expect(data.key).toEqual(undefined);
    expect(data.bucket).toEqual(undefined);
  });

  test("does not return a charger with invalid id", async () => {
    const req = {
      params: { id: "100" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getCharger(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "No record found" });
  });
});

describe("updateCharger function", () => {
  test("update charger record from form data received", async () => {
    const req = {
      body: {
        name: "Updated name",
        instructions: "Go to basement and plug in",
        price: "40",
        status: "active",
        plugName: "typeOne",
        username: "Kim",
      },
      file: {
        buffer: "my file contents",
      },
      params: {
        id: 3,
      },
      user: {
        username: "Kim"
      }
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateCharger(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    expect(data.name).toEqual("Updated name");
    expect(data.status).toEqual("active");
  });

  test("errors when unknown chargerId sent", async () => {
    const req = {
      body: {
        name: "Updated name",
        instructions: "Go to basement and plug in",
        price: "40",
        status: "active",
        plugName: "typeOne",
        username: "Kim",
      },
      file: {
        buffer: "my file contents",
      },
      params: {
        id: 100,
      },
      user: {
        username: "Kim"
      }
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateCharger(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "No record found" });
  });

  test("throw unauthorised error when request username does not match host's username", async () => {
    const req = {
      body: {
        name: "Updated name",
        instructions: "Go to basement and plug in",
        price: "40",
        status: "active",
        plugName: "typeOne",
        username: "Kim",
      },
      file: {
        buffer: "my file contents",
      },
      params: {
        // charger id 4 belongs to Ash user but loggedInUser is Kim
        id: 4,
      },
      user: {
        username: "Kim"
      }
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateCharger(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      error: "Unauthorised operation",
    });
  });
});

describe("deleteCharger function", () => {
  let chargerId;
  // Create charger to test delete function
  beforeEach(async () => {
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

    expect(status).toHaveBeenCalledWith(201);
    const data = json.mock.calls[0][0];

    chargerId = data.id;
  });

  afterEach(async () => {
    await Charger.destroy({
      where: { name: "TEST Create Charger" },
    });
  });

  test("delete a charger with a valid id", async () => {
    const req = {
      params: { id: chargerId },
      user: { username: "Kim" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await deleteCharger(req, res);

    expect(status).toHaveBeenCalledWith(204);
    expect(json).toHaveBeenCalledWith({ message: "charger details deleted" });
  });

  test("does not execute with invalid charger id", async () => {
    const req = {
      params: { id: "100" },
      user: {
        username: "Kim",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await deleteCharger(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "No record found" });
  });

  test("does not execute with unauthorised user", async () => {
    const req = {
      params: { id: chargerId },
      user: {
        username: "Ash",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await deleteCharger(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: "Unauthorised operation" });
  });
});

describe("getChargers function", () => {
  test("return a list of chargers that do not contain bucket and key data", async () => {
    const req = {};

    const status = jest.fn();
    const send = jest.fn();
    const res = { status, send };

    await getChargers(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalled();

    const data = send.mock.calls[0][0];

    const disabledCharger = data.find(
      (charger) => charger.status === "disabled"
    );
    const pendingCharger = data.find((charger) => charger.status === "pending");

    expect(data.length).toBeGreaterThan(1);
    expect(data[0].instructions).toEqual("Go to basement and plug in");
    expect(data[0].status).toEqual("active");
    expect(data[0].key).toEqual(undefined);
    expect(data[0].bucket).toEqual(undefined);
    expect(disabledCharger).toEqual(undefined);
    expect(pendingCharger).toEqual(undefined);
  });

  test("does not return 'active' chargers owned by current user 'Kim'", async () => {
    const req = {
      user: { username: "Kim" },
    };

    const status = jest.fn();
    const send = jest.fn();
    const res = { status, send };

    await getChargers(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalled();

    const data = send.mock.calls[0][0];

    const currentUserChargers = data.find((charger) => charger.HostId === 1);
    expect(currentUserChargers).toEqual(undefined);
  });
});

describe("getMyChargers function", () => {
  test("return a list of current user chargers", async () => {
    const req = {
      user: {
        username: "Kim",
      },
    };

    const status = jest.fn();
    const send = jest.fn();
    const next = jest.fn();
    const res = { status, send };

    await getMyChargers(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalled();

    const data = send.mock.calls[0][0];

    const chargerTwo = data.find(
      (charger) => charger.name === "Super Charger Test 2"
    );
    expect(data.length).toBeGreaterThan(2);
    expect(data[0].key).toEqual(undefined);
    expect(data[0].bucket).toEqual(undefined);
    expect(chargerTwo.status).toEqual("pending");
  });

  test("does not return chargers when user is not logged in", async () => {
    const req = {};

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getMyChargers(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      error: "Please sign in to continue",
    });
  });
});

describe("updateChargerStatus function", () => {
  let chargerId;
  // Create charger to test delete function
  beforeEach(async () => {
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

    expect(status).toHaveBeenCalledWith(201);
    const data = json.mock.calls[0][0];

    chargerId = data.id;
  });

  afterEach(async () => {
    await Charger.destroy({
      where: { name: "TEST Create Charger" },
    });
  });

  test("update charger record with Patch req from form data received", async () => {
    const req = {
      body: {
        status: "disabled",
      },
      user: {
        username: "Kim",
      },
      params: {
        id: chargerId,
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateChargerStatus(req, res);

    expect(status).toHaveBeenCalledWith(204);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    expect(data.status).toEqual("disabled");
  });

  test("errors when unknown chargerId sent", async () => {
    const req = {
      body: {
        status: "disabled",
      },
      user: {
        username: "Kim",
      },
      params: {
        id: 100,
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateChargerStatus(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: "No record found" });
  });

  test("throw unauthorised error when request username does not match host's username", async () => {
    const req = {
      body: {
        status: "disabled",
      },
      user: {
        username: "Ash",
      },
      params: {
        id: chargerId,
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await updateCharger(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      error: "Unauthorised operation",
    });
  });
});


describe("searchChargersLocation function", () => {
  test("return a list of found chargers", async () => {
    const req = {
      user: {
        username: "Ash"
      },
      query: {
        location: "Sydney",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await searchChargersLocation(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];

    const chargerOne = data.find(
      (charger) => charger.name === "Super Charger Test 1"
    );

    const chargerByAsh = data.find((charger) => charger.HostId === 2)
    expect(data.length).toBeGreaterThan(1);
    expect(data[0].key).toEqual(undefined);
    expect(data[0].bucket).toEqual(undefined);
    expect(chargerOne.status).toEqual("active");
    expect(chargerOne.price).toEqual(3000);
    expect(chargerOne.Address.city).toEqual("Sydney");
    expect(chargerByAsh).toEqual(undefined);


  });


  test("return empty list when no match found", async () => {
    const req = {
      user: {
        username: "Ash"
      },
      query: {
        location: "Zurich",
      },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await searchChargersLocation(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ error: "No matched chargers found" });

  });

});
