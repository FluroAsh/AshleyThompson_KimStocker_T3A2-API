const { ExistingObjectReplication } = require("@aws-sdk/client-s3");
const db = require("../models");
const { Booking } = db;
const {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
  getAllBookingRequests,
} = require("../controllers/booking-controller");

// Mock module booking utils
jest.mock("../utils/booking-utils", () => ({
  // mock resolved value for getUserBookings to be the below
  getUserBookings: () => [
    {
      id: 20,
      bookingDate: "2022-08-06",
      price: 3000,
      status: "approved",
      createdAt: "2022-08-04T22:47:21.241Z",
      updatedAt: "2022-08-04T22:48:22.433Z",
      ChargerId: 1,
      UserId: 2,
      User: {
        id: 2,
        firstName: "Ashley",
        lastName: "Thompson",
        email: "ash@test.com",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
      },
      Charger: {
        id: 1,
        name: "Super Charger Test 1",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3000,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 1,
        UserId: 1,
        PlugId: 1,
        Host: {
          id: 1,
          firstName: "Kim",
          lastName: "Stocker",
          email: "kim@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 1,
          address: "1 George Street",
          city: "Sydney",
          postcode: "2000",
          state: "New South Wales",
          UserId: 1,
        },
      },
    },
    {
      id: 2,
      bookingDate: "2022-08-04",
      price: 3000,
      status: "rejected",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 1,
      UserId: 2,
      User: {
        id: 2,
        firstName: "Ashley",
        lastName: "Thompson",
        email: "ash@test.com",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
      },
      Charger: {
        id: 1,
        name: "Super Charger Test 1",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3000,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 1,
        UserId: 1,
        PlugId: 1,
        Host: {
          id: 1,
          firstName: "Kim",
          lastName: "Stocker",
          email: "kim@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 1,
          address: "1 George Street",
          city: "Sydney",
          postcode: "2000",
          state: "New South Wales",
          UserId: 1,
        },
      },
    },
    {
      id: 4,
      bookingDate: "2022-08-04",
      price: 3000,
      status: "pending",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 1,
      UserId: 2,
      User: {
        id: 2,
        firstName: "Ashley",
        lastName: "Thompson",
        email: "ash@test.com",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
      },
      Charger: {
        id: 1,
        name: "Super Charger Test 1",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3000,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 1,
        UserId: 1,
        PlugId: 1,
        Host: {
          id: 1,
          firstName: "Kim",
          lastName: "Stocker",
          email: "kim@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 1,
          address: "1 George Street",
          city: "Sydney",
          postcode: "2000",
          state: "New South Wales",
          UserId: 1,
        },
      },
    },
    {
      id: 1,
      bookingDate: "2022-08-04",
      price: 3000,
      status: "cancelled",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 1,
      UserId: 2,
      User: {
        id: 2,
        firstName: "Ashley",
        lastName: "Thompson",
        email: "ash@test.com",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
      },
      Charger: {
        id: 1,
        name: "Super Charger Test 1",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3000,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 1,
        UserId: 1,
        PlugId: 1,
        Host: {
          id: 1,
          firstName: "Kim",
          lastName: "Stocker",
          email: "kim@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 1,
          address: "1 George Street",
          city: "Sydney",
          postcode: "2000",
          state: "New South Wales",
          UserId: 1,
        },
      },
    },
  ],
  getBookingRequests: () => [
    {
      id: 13,
      bookingDate: "2022-10-07",
      price: 3321,
      status: "approved",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 4,
      UserId: 3,
      User: {
        id: 3,
        firstName: "Taya",
        lastName: "Haag",
        email: "Schneider_Pat@Rempel.ca",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
        UserVehicle: {
          id: 3,
          VehicleId: 3,
          UserId: 3,
          Vehicle: {
            id: 3,
            make: "Audi",
            model: "e-tron SUV",
            variant: "e-tron SUV 50",
            PlugId: 1,
            createdAt: "2022-08-04T22:46:31.319Z",
            updatedAt: "2022-08-04T22:46:31.319Z",
          },
        },
      },
      Charger: {
        id: 4,
        name: "Ash's Charger",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3500,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 2,
        UserId: 2,
        PlugId: 1,
        Host: {
          id: 2,
          firstName: "Ashley",
          lastName: "Thompson",
          email: "ash@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 2,
          address: "123 Pitt Street",
          city: "Melbourne",
          postcode: "3000",
          state: "Victoria",
          UserId: 2,
        },
      },
    },
    {
      id: 11,
      bookingDate: "2022-12-25",
      price: 4906,
      status: "approved",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 4,
      UserId: 9,
      User: {
        id: 9,
        firstName: "Rubye",
        lastName: "Klocko",
        email: "Heller_Ward@yahoo.com",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
        UserVehicle: {
          id: 9,
          VehicleId: 9,
          UserId: 9,
          Vehicle: {
            id: 9,
            make: "Audi",
            model: "e-tron SUV",
            variant: "e-tron SUV 50",
            PlugId: 2,
            createdAt: "2022-08-04T22:46:31.319Z",
            updatedAt: "2022-08-04T22:46:31.319Z",
          },
        },
      },
      Charger: {
        id: 4,
        name: "Ash's Charger",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3500,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 2,
        UserId: 2,
        PlugId: 1,
        Host: {
          id: 2,
          firstName: "Ashley",
          lastName: "Thompson",
          email: "ash@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 2,
          address: "123 Pitt Street",
          city: "Melbourne",
          postcode: "3000",
          state: "Victoria",
          UserId: 2,
        },
      },
    },
    {
      id: 14,
      bookingDate: "2022-10-22",
      price: 3980,
      status: "rejected",
      createdAt: "2022-08-04T22:46:31.536Z",
      updatedAt: "2022-08-04T22:46:31.536Z",
      ChargerId: 4,
      UserId: 3,
      User: {
        id: 3,
        firstName: "Taya",
        lastName: "Haag",
        email: "Schneider_Pat@Rempel.ca",
        createdAt: "2022-08-04T22:46:31.261Z",
        updatedAt: "2022-08-04T22:46:31.261Z",
        UserVehicle: {
          id: 3,
          VehicleId: 3,
          UserId: 3,
          Vehicle: {
            id: 3,
            make: "Audi",
            model: "e-tron SUV",
            variant: "e-tron SUV 50",
            PlugId: 1,
            createdAt: "2022-08-04T22:46:31.319Z",
            updatedAt: "2022-08-04T22:46:31.319Z",
          },
        },
      },
      Charger: {
        id: 4,
        name: "Ash's Charger",
        bucket: "iev",
        key: "uploads/turtle.png",
        instructions: "Go to basement and plug in",
        price: 3500,
        status: "active",
        createdAt: "2022-08-04T22:46:31.487Z",
        updatedAt: "2022-08-04T22:46:31.487Z",
        AddressId: 2,
        UserId: 2,
        PlugId: 1,
        Host: {
          id: 2,
          firstName: "Ashley",
          lastName: "Thompson",
          email: "ash@test.com",
          createdAt: "2022-08-04T22:46:31.261Z",
          updatedAt: "2022-08-04T22:46:31.261Z",
        },
        Address: {
          id: 2,
          address: "123 Pitt Street",
          city: "Melbourne",
          postcode: "3000",
          state: "Victoria",
          UserId: 2,
        },
      },
    },
  ],

  getBookingById: () => ({
    id: 2,
    bookingDate: "2022-08-04",
    price: 3000,
    status: "rejected",
    createdAt: "2022-08-04T22:46:31.536Z",
    updatedAt: "2022-08-04T22:46:31.536Z",
    ChargerId: 1,
    UserId: 2,
    User: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
    },
  }),
}));

describe("getAllUserBookings function", () => {
  test("return a list of bookings", async () => {
    const req = {
      user: { username: "Ash", id: 2 },
      params: { username: "Ash" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getAllUserBookings(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    console.log("THIS IS DATA MOCK TEST", data);
    expect(data[0].UserId).toEqual(2);
    expect(data[0].ChargerId).toEqual(1);
    expect(data[0].Charger.name).toEqual("Super Charger Test 1");
    expect(data[0].Charger.Host.firstName).toEqual("Kim");
    expect(data[0].status).toEqual("approved");
  });

  test("throw error with unauthorised access", async () => {
    const req = {
      user: { username: "Ash", id: 2 },
      params: { username: "Kim" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getAllUserBookings(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "You are not allowed to do that",
    });
  });
});

describe("getAllBookingRequests function", () => {
  test("return a list of bookings requests", async () => {
    const req = {
      user: { username: "Ash", id: 2 },
      params: { username: "Ash" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getAllBookingRequests(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalled();

    const data = json.mock.calls[0][0];
    console.log("THIS IS DATA MOCK TEST", data);
    // User who rent the charger
    expect(data[0].User.firstName).toEqual("Taya");
    // Host is Ashley aka user who is viewing the booking requests
    expect(data[0].Charger.Host.firstName).toEqual("Ashley");
  });

  test("throw error with unauthorised access", async () => {
    const req = {
      user: { username: "Ash", id: 2 },
      params: { username: "Kim" },
    };

    const status = jest.fn();
    const json = jest.fn();
    const res = { status, json };

    await getAllBookingRequests(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: "You are not allowed to do that",
    });
  });
});
