const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require('supertest');
const recordModel = require('../models/record');
const { default: mongoose } = require("mongoose");

const url = 'http://localhost:3001/records/';

const recordTestPost = {
  eventId: '640c88c3039c496317708351',
  pee: true, 
  poo: true
}

describe('Record tests: ', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Walky-Doggy');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })

  describe('POST /', () => {
    it('Should respond with a status code of 201', async () => {
      const res = await request(url).post('/')
      .send(recordTestPost);
      expect(res.status).toBe(201);
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
    it('Should post the record on the DB:', async () => {
      const res = await recordModel.find({eventId: recordTestPost.eventId});
      expect(res).toBeTruthy();
    })
  })
  describe('GET /eventId/ : ', () => {
    it('Should responds with status 200', async () => {
      const res = await request(url).get(recordTestPost.eventId);
      expect(res.status).toBe(200);
    })
    it('Should specify json in the content type header: ', async () => {
      const res = await request(url).get(recordTestPost.eventId);
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
    it('Should get the record from DB', async () => {
      const res = await recordModel.find({eventId: recordTestPost.eventId})
      expect(res).toBeTruthy();
    })
  })


  describe('DELETE /id', () => {
    it('Should delete event from id', async () => {
      const response = await request(url).delete(recordTestPost.eventId);
      expect(response.status).toBe(200);
    })
  })
})

