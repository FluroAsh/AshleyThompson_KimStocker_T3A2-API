// const { ExistingObjectReplication } = require("@aws-sdk/client-s3");
// const db = require("../models");
// const { Booking } = db;
// const {
//   getBooking,
//   getBookings,
//   createBooking,
//   updateBooking,
//   deleteBooking,
//   getAllUserBookings,
//   getAllBookingRequests,
// } = require("../controllers/booking-controller");

// describe("createBooking function", () => {
//   let num = 35;

//   afterEach(() => {
//     return num += 1
//   });

//   test("create a booking with data received", async () => {
//     var date = new Date();
//     date.setDate(date.getDate() + num);

//     const bookings = [
//       {
//         ChargerId: 1,
//         bookingDate: date,
//         price: 3000,
//         status: "pending",
//         localTime: new Date(date).toDateString(),
//       },
//     ];

//     const req = {
//       body: bookings,
//       user: {
//         username: "Ash",
//         id: 2,
//       },
//     };

//     const status = jest.fn();
//     const json = jest.fn();
//     const next = jest.fn();
//     const res = { status, json };

//     await createBooking(req, res, next);

//     expect(status).toHaveBeenCalledWith(201);
//     expect(json).toHaveBeenCalled();

//     const data = json.mock.calls[0][0];
//     console.log("THIS IS TEST DATA", data)


//     // expect(data.ChargerId).toEqual(1);
//     expect(data.price).toEqual(3000);
//     expect(data.status).toEqual("pending");

//   });

//   test("throw error if user not loggedIn", async () => {
//     var date = new Date();
//     date.setDate(date.getDate() + 1);

//     const bookings = [
//       {
//         ChargerId: 1,
//         bookingDate: date,
//         price: 3000,
//         status: "pending",
//         localTime: new Date(date).toDateString(),
//       },
//     ];

//     const req = {
//       body: bookings,
//       // user: {
//       //     username: "Ash",
//       //     id: 2,
//       // }
//     };

//     const status = jest.fn();
//     const json = jest.fn();
//     const res = { status, json };

//     await createBooking(req, res);

//     expect(status).toHaveBeenCalledWith(401);
//     expect(json).toHaveBeenCalledWith({ error: "Please sign in to continue" });
//   });
// });
