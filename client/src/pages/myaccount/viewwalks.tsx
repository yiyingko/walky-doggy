import Head from 'next/head';
import { useState, useEffect } from 'react';
import Events from '../../../components/Events';
import styles from '../../styles/Home.module.css';

type EventProps = {
  _id: string;
  title: string;
  date: Date;
  venue: string;
};

const Viewwalks = () => {
  const [events, setEvents] = useState<EventProps[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventsServer = await fetchEvents();
      setEvents(eventsServer);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:3001/events/past');
    const data = await res.json();

    return data;
  };

  const deleteEvent = async (_id: string) => {
    await fetch(`http://localhost:3001/events/${_id}`, {
      method: 'DELETE',
    }).then(() => {
      setEvents(events.filter((event) => event._id !== _id));
    });
  };

  return (
    <>
      <Head>
        <title>Walky Doggy | view walks</title>
      </Head>
      <h1 className={styles.title}>View Walk Histroy</h1>
      <Events events={events} onDelete={deleteEvent} formPath='/formuser/' />
    </>
  );
};

export default Viewwalks;
