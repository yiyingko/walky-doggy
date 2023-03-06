
import React, { createContext, useState ,useEffect} from "react";

export const EventContext = createContext(null);


export const EventContextProvider = ({ children }) => {
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

      const addEvent = async (event) => {
        fetch("http://localhost:3001/events", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(event),
        }).then(result => fetchEvents().then(newList => setEvents(newList)));
      
      };    

  
    const value = {
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