const { describe, expect, test, beforeAll, afterAll } = require("@jest/globals");
const {MongoClient} = require('mongodb');
const request = require('supertest');
const eventModel = require('../models/event');
const waitOn = require('wait-on');
const { default: mongoose } = require("mongoose");

const url = 'http://localhost:3001/events/';

const eventTest1 = {
  title: 'Seth',
  date: '2023-03-12T09:00:00.000Z',
  venue: 'Carrer X'
}





describe('Event tests:', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Walky-Doggy');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })

  describe('POST /events/', () => {
    it('Should respond with a status code of 400 if has no full info', async () => {
      const res = await request(url).post('/')
      .send({title: 'Teste'});
      expect(res.status).toBe(400);
    })
    it('Should respond with a status code of 400 if has no full info', async () => {
      const res = await request(url).post('/')
      .send({date: 'Teste'});
      expect(res.status).toBe(400);
    })
    it('Should respond with a status code of 400 if has no full info', async () => {
      const res = await request(url).post('/')
      .send({venue: 'Teste'});
      expect(res.status).toBe(400);
    })
    it('Should respond with a status code of 201 if all infos', async () => {
      const res = await request(url).post('/')
      .send(eventTest1);
      expect(res.status).toBe(201);
    })
  })

  describe('GET /events/', () => {
    it("Should responds with status 200", async () => {
      const res = await request(url).get('/');
      expect(res.status).toBe(200);
    })
    it("Should specify json in the content type header", async () => {
      const res = await request(url).get('/');
      expect(res.header['content-type']).toEqual(expect.stringContaining("json"));
    })
    it("Should get the events on DB", async () => {
      const res = await request(url).get('/');
      const events = res.body.map((event) => event.title)
      expect(events).toEqual([eventTest1.title]);
    })
  })

  describe('GET /events/past/', () => {
    it("Should responds with status 200", async () => {
      const res = await request(url).get('past/');
      expect(res.status).toBe(200);
    })
    it("Should specify json in the content type header", async () => {
      const res = await request(url).get('past/');
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
  })

  describe('DELETE /events/:id', () => {
    it('Should delete event from id', async () => {
      const res = await request(url).get('/');
      const events = res.body.map((event) => event._id);
      const id = events[0];
      console.log(id);
      const response = await request(url).delete(`${id}`);
      const deletedEvent = await eventModel.findById(id);
      console.log(deletedEvent);
      expect(deletedEvent).toBeNull();
      expect(response.status).toBe(200);
    })
  })
});