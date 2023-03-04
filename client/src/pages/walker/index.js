import Head from 'next/head'
import Link from 'next/link';
import Events from '../../../components/Events';
import Event from '../../../components/Event';
import { useState, useEffect } from "react";


const walker = () => {
    const [events, setEvents] = useState(() =>[]);
  
    useEffect(() => {
      const getEvents = async () => {
        const eventsServer = await fetchEvents();
        setEvents(eventsServer);
      };
      getEvents();
    }, []);


    const fetchEvents = async () => {
      const res = await fetch("http://localhost:3001/events");
      const data = await res.json();
  
      return data;
    };

    const deleteEvent = async (_id) => {
      await fetch(`http://localhost:3001/events/${_id}`, {
        method: "DELETE",
      }).then(()=> {
        console.log("deleteevent: " + JSON.stringify(deleteEvent));
        setEvents(events.filter((event) => event._id !== _id));
      });
    }

  return (
    <>
      <Head>
        <title>Walky Doggy | Walker</title>
      </Head>
      <div>walker's event </div>
      <Link href="/walkform">Walkform</Link>
      <Events events={events} />
      {/* onDelete={deleteEvent} */}
    </>
  );
};


export default walker;
