const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require('supertest');
const infoWalk = require('../models/infoWalk');
const { default: mongoose } = require("mongoose");

const url = 'http://localhost:3001/walks';

const walkTest = {
  name: 'Seth',
  date: '2023-03-12T09:00:00.000Z',
  venue: 'Carrer X'
}

describe('Walks tests:', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Walky-Doggy');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })

  describe('POST /walks/', () => {
    it('Should respond with a status code of 201 if posted succesfully', async () => {
      const res = await request(url).post('/')
      .send(walkTest);
      expect(res.status).toBe(201);
      expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    })
    it('Should post the walk on the DB', async () => {
      const res = await infoWalk.find({name: walkTest.name});
      expect(res).toBeTruthy();
    })
  })

  describe('GET /walks/', () => {
    it('Should responds with status 200', async () => {
      const res = await request(url).get('/');
      expect(res.status).toBe(200);
    })
    it('Should specify json in the content type header', async () => {
      const res = await request(url).get('/');
      expect(res.header['content-type']).toEqual(expect.stringContaining("json"));
    })
  })

  describe('GET /walks/:id', () => {
    it('Should respond with status 200', async() => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const response = await request(url).get(`/${id}`);
      expect(response.status).toBe(200);
      expect(response.header['content-type']).toEqual(expect.stringContaining("json"));
    })
    it('Should send only the walk passed by id', async () => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const response = await request(url).get(`/${id}`);
      expect(response.body).toHaveLength(1);
    })
  })

  describe('Should update the walk passed by id', () => {
    it('Should change pee to true', async () => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const updatePayload = {
        records: {
          pee: true,
          poo: selectedWalk.records.poo
        },
        image: selectedWalk.image,
        coordinates: selectedWalk.coordinates
      };
      await request(url)
        .put(`/${id}`)
        .send(updatePayload);
    
      const updatedWalk = await infoWalk.find({name: walkTest.name})
      expect(updatedWalk.at(0).records.pee).toBe(true);
    });
    
    it('Should change poo to true', async () => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const updatePayload = {
        records: {
          pee: selectedWalk.records.pee,
          poo: true
        },
        image: selectedWalk.image,
        coordinates: selectedWalk.coordinates
      };
      await request(url)
        .put(`/${id}`)
        .send(updatePayload);
    
      const updatedWalk = await infoWalk.find({name: walkTest.name})
      expect(updatedWalk.at(0).records.poo).toBe(true);
    })

    it('Should pee and poo be true', async () => {
      const updatedWalk = await infoWalk.find({name: walkTest.name})
      expect(updatedWalk.at(0).records.pee).toBe(true);
      expect(updatedWalk.at(0).records.poo).toBe(true);
    })

    it('Should change pee and poo back to false', async () => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const updatePayload = {
        records: {
          pee: false,
          poo: false
        },
        image: selectedWalk.image,
        coordinates: selectedWalk.coordinates
      };
      await request(url)
        .put(`/${id}`)
        .send(updatePayload);
    
      const updatedWalk = await infoWalk.find({name: walkTest.name})
      expect(updatedWalk.at(0).records.pee).toBe(false);
      expect(updatedWalk.at(0).records.poo).toBe(false);
    })
  })

  describe('DELETE /walks/:id', () => {
    it('Should responds with 200 when delete by id', async () => {
      const res = await request(url).get('/');
      const walks = res.body;
      const selectedWalk = walks.find((walk) => walk.name === walkTest.name);
      const id = selectedWalk._id;
      const response = await request(url).delete(`/${id}`);
      expect(response.status).toBe(200);
    })
    it('Should delete from the dataBase', async () => {
      const res = await infoWalk.find({name: walkTest.name});
      expect(res).toHaveLength(0);
    })
  })


})