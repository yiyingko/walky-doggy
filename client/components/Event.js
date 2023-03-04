import moment from 'moment'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { BsFillTrash2Fill} from "react-icons/bs";
import { useState, useEffect } from "react";


const Event = ({ event}) => {
  const [events, setEvents] = useState(() =>[]);
  

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
    <div>
      <div id="event-list">
        <div className="left">
          <div className="event-day-month">{moment(event.date).format('Do[\n]MMM')}</div>
          <div className="event-outer">
          <div className="list-title">
            {event.title}{" "}
            </div>
            <div className="list-date">
              <p>{moment(event.date).format('hh:mm a - MMMM  Do, YYYY')}</p>
            </div>
            <div className="list-venue">
              <p>{event.venue}</p>
            </div>
          </div>
          <div className='btn-dev'>
          <Link href={`/form/${event._id}`}><button className='btn' >Click</button></Link>
          <BsFillTrash2Fill className="dele-btn"
          onClick={() => deleteEvent(event._id)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
