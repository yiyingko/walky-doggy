import Head from 'next/head';
import Events from '../../components/Events';
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import { getAllWalks, deleteWalk } from '../../Service/api';

type EventProps = {
  _id?: string;
  name: string;
  date: Date;
  venue: string;
};

const Walker = () => {
  const [events, setEvents] = useState<EventProps[]>([]);

  const deleteEvent = async (_id: string) => {
    await deleteWalk(_id);
    setEvents(events.filter((event) => event._id !== _id));
  };

  useEffect(() => {
    const getEvents = async () => {
      const eventsServer = await getAllWalks();
      setEvents(eventsServer);
    };
    getEvents();
  }, []);

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
