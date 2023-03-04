import moment from 'moment';

const NextEvent = ({ event }) => {
    return (
      <div>
        <div id="first-event" >
          <div><h6>Next Walk</h6></div>
          <div className="date-month">{moment(event.date).format('Do MMM')}</div>
          {event.title}{" "}
          <div className="first-day">
            <p>{moment(event.date).format('hh:mm a - MMMM  Do, YYYY')}</p>
          </div>
          <div className="first-venue">
            <p>{event.venue}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default NextEvent;