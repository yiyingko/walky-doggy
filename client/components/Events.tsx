import Event from './Event';

type EventProps = {
  _id: string;
  title: string;
  date: Date;
  venue: string;
};

type EventsProps = {
  events: EventProps[];
  onDelete: (id: string) => void;
  formPath: string;
};

const Events = ({ events, onDelete, formPath }: EventsProps) => {
  return (
    <div id='list'>
      {events &&
        events.map((event, index) => {
          return (
            <Event
              key={index}
              event={event}
              onDelete={onDelete}
              formPath={formPath}
            />
          );
        })}
    </div>
  );
};

export default Events;
