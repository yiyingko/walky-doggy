const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require('supertest');
const locationModel = require('../models/location');
const { default: mongoose } = require("mongoose");

const url = 'http://localhost:3001/locations/';

const locationTest = {
  eventId: '640c7e5df9091f058671207a',
  coordinates: [2.1977306,41.3949352]
}

describe('Location tests: ', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Walky-Doggy');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })

  describe('/POST /locations/', () => {
    it("Should respond with a status code of 201:", async () => {
      const res = await request(url).post("/")
      .send(locationTest);
      expect(res.status).toBe(201);
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
    it('Should post the location on the DB:', async () => {
      const res = await locationModel.find({eventId: locationTest.eventId});
      expect(res).toBeTruthy();
    })
  })

  describe('/GET /', () => {
    it("Should respond with a status code of 200", async () => {
      const res = await request(url).get(locationTest.eventId);
      expect(res.status).toBe(200);
    })
    it("Should specify json in the content type:", async () => {
      const res = await request(url).get(locationTest.eventId);
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
    it("Should get the location from the DB:", async () => {
      const res = await locationModel.find({eventId: locationTest.eventId});
      expect(res).toBeTruthy();
    })
  })
})