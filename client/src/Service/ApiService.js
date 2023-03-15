const BASE_URL = 'http://localhost:3001';

//events api:

export const addEvent = async (event) => {
  const response = await fetch(`${BASE_URL}/events/`, {
    method: "POST", 
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(event),
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error)
  })
  return response; 
}

export const getEvents = async () => {
  const events = await fetch(`${BASE_URL}/events/`);
  return events.json();
}

export const deleteEvent = async (event) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${event._id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(event),
    })
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
}

//records api:

export const postRecord = async (record) => {
  try {
    const response = await fetch(`${BASE_URL}/records/${record._id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(record),
    })
    .then((response) => response.json())
    return response;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const getRecord = async (record) => {
  const response = await fetch(`${BASE_URL}/records/${record._id}`);
  return response.json();
}

//image api:

export const postImage = async (image) => {
  try {
    const response = await fetch(`${BASE_URL}/records/`, {
      method: "POST", 
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(image),
    })
    .then((response) => response.json())
    return response;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const getImage = async (image) => {
  const response = await fetch(`${BASE_URL}/images/${image.eventId}`);
  return response.json();
}