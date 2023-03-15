import React, { createContext, useState, useEffect } from 'react';
import * as ApiService from '../src/service/ApiService';

export const EventContext = createContext(null);

type EventProps = {
  _id?: string;
  title: string;
  date: Date;
  venue: string;
};

type EventContextType = {
  events: EventProps[];
  setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>;
  useEffect: typeof useEffect;
  fetchEvents: () => Promise<EventProps[]>;
  deleteEvent: (id: string) => Promise<void>;
  addEvent: (event: EventProps) => Promise<void>;
};

type LayoutProps = {
  children: React.ReactNode;
};

export const EventContextProvider = ({ children }: LayoutProps) => {
  const [events, setEvents] = useState<EventProps[]>(() => []);

  useEffect(() => {
    const getEvents = async () => {
      const eventsServer = await fetchEvents();
      setEvents(eventsServer);
    };
    getEvents();
  }, []);

  const fetchEvents = ApiService.getEvents;

  const deleteEvent = ApiService.deleteEvent;

  const addEvent = ApiService.addEvent;

  const value: EventContextType | null = {
    events,
    setEvents,
    useEffect,
    fetchEvents,
    deleteEvent,
    addEvent,
  };

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        useEffect,
        fetchEvents,
        deleteEvent,
        addEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
