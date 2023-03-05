import moment from 'moment'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { FaTrash} from "react-icons/fa";
import { useState, useEffect } from "react";


const Event = ({ event, onDelete}) => {

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
          <FaTrash className="dele-btn"
          onClick={() => onDelete(event._id)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
