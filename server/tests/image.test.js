const request = require('supertest');
const mongoose = require('mongoose');

const url = 'http://localhost:3001/images';

const api = request(url);

const imageRouter = require('../router/image.router');
const Image = require('../models/image');

const images = [
  {
    eventId: 'A12345',
    url: 'https://www.imagetest1.com',
  },
  {
    eventId: 'B12345',
    url: 'https://www.imagetest2.com',
  },
];

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/Walky-Doggy');
});

beforeEach(async () => {
  await Image.deleteMany({});

  const image1 = new Image(images[0]);
  await image1.save();

  const image2 = new Image(images[1]);
  await image2.save();
});

describe('Images', () => {
  test('GET Images are returned as json', async () => {
    const response = await api.get(`/${images[1].eventId}`);
    expect(response.status).toBe(200);
  });
  test('GET an image', async () => {
    const response = await api.get(`/${images[1].eventId}`);
    expect(response.body).toHaveLength(1);
  });
  test('GET Contains Image1', async () => {
    const response = await api.get(`/${images[0].eventId}`);
    expect(response.body[0].url).toContain('https://www.imagetest1.com');
  });
  test('POST Added one image', async () => {
    const newImage = { eventId: 'C12345', url: 'https://www.imagetest3.com' };
    const response = await api.post('/').send(newImage);
    expect(response.status).toBe(201);
  });
  test('Should DELETE event from id', async () => {
    const res = await api.get(`/${images[0].eventId}`);
    const id = res.body[0].id;
    const response = await api.delete(`${id}`);
    const deletedImage = await Image.findById(id);
    expect(deletedImage).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
