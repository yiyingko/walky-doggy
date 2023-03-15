const BASE_URL = 'http://localhost:3001';

//events api:

export const addEvent = async (event) => {
  const response = await fetch(`${BASE_URL}/events/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  return response;
};

export const getEvents = async () => {
  const events = await fetch(`${BASE_URL}/events`);
  return events.json();
};

export const getEventsPast = async () => {
  const events = await fetch(`${BASE_URL}/events/past`);
  return events.json();
};

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

//records api:

export const addRecord = async (record) => {
  try {
    const response = await fetch(`${BASE_URL}/records/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    }).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getRecord = async (id) => {
  const response = await fetch(`${BASE_URL}/records/${id}`);
  return response.json();
};

//image api:

export const addImage = async (image) => {
  try {
    const response = await fetch(`${BASE_URL}/records/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    }).then((response) => response.json());
    return response;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getImage = async (image) => {
  const response = await fetch(`${BASE_URL}/images/${image.eventId}`);
  return response.json();
};

//location api:

export const addLocation = async (location) => {
  try {
    const response = await fetch(`${BASE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCoordinates = async (id) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`);
  const data = await res.json();
  return data;
};
