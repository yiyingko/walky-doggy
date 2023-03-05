
import Event from "./Event";
import NextEvent from "./NextEvent";



const Events = ({ events, onDelete, formPath }) => {
  //const events = useContext(EventContext)
  return (
    <div id="list">
      { events.map((event, index) => {
          //console.log("event: " + JSON.stringify(event));
          if (index === 0) {
            return <NextEvent key={index} event={event} /> 
          } else {
            return <Event key={index} event={event} events={events} onDelete={onDelete} formPath={formPath}/>
          }
      })}
    </div>
  );
};

export default Events;
