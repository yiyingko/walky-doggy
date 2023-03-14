import React, { createContext, useState ,useEffect} from "react";

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
}


type LayoutProps = {
  children: React.ReactNode;
};


export const EventContextProvider = ({ children } : LayoutProps) => {
    const [events, setEvents] = useState<EventProps[]>(() =>[]);

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
    
      const deleteEvent = async (_id: string) => {
        await fetch(`http://localhost:3001/events/${_id}`, {
          method: "DELETE",
        }).then(()=> {
          console.log("deleteevent: " + JSON.stringify(deleteEvent));
          setEvents(events.filter((event) => event._id !== _id));
        });
      }

      const addEvent = async (event: EventProps) => {
        fetch("http://localhost:3001/events", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(event),
        }).then(result => fetchEvents().then(newList => setEvents(newList)));
      
      };    

  
    const value: EventContextType | null = {
      events, 
      setEvents,
      useEffect,
      fetchEvents,
      deleteEvent,
      addEvent
    };
  
    return (
      <EventContext.Provider value={{events,setEvents,useEffect,fetchEvents,deleteEvent,addEvent}}> 
      

    
      {children} 
      
      </EventContext.Provider>
    );
  };
  
  export default EventContext;