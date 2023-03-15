import Head from 'next/head';
import Link from 'next/link';
import Events from '../../../components/Events';
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import * as ApiService from '../../service/ApiService';

type EventProps = {
  _id?: string;
  title: string;
  date: Date;
  venue: string;
};

const Walker = () => {
  const [events, setEvents] = useState<EventProps[]>([]);

  const fetchEvents = ApiService.getEvents;

  const deleteEvent = async (_id: string) => {
    await ApiService.deleteEvent(_id);
    setEvents(events.filter((event) => event._id !== _id));
  };

  useEffect(() => {
    const getEvents = async () => {
      const eventsServer = await fetchEvents();
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
