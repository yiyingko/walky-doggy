import Head from 'next/head';
import Link from 'next/link';
import Events from '../../../components/Events';
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

type EventProps = {
  _id?: string;
  title: string;
  date: Date;
  venue: string;
};

const Walker = () => {
  const [events, setEvents] = useState<EventProps[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventsServer = await fetchEvents();
      setEvents(eventsServer);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:3001/events');
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
        <title>Walky Doggy | Walker</title>
      </Head>
      <h1 className={styles.title}>Walks Schedule</h1>
      <Events events={events} onDelete={deleteEvent} formPath='/form/' />
    </>
  );
};

export default Walker;
