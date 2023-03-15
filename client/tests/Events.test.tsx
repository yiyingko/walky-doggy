import React from 'react';
import { shallow } from 'enzyme';
import Events from '../src/components/Events';
import Event from '../src/components/Event';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Events', () => {
  const events = [
    {
      _id: '1',
      title: 'Event 1',
      date: new Date(),
      venue: 'Venue 1',
    },
    {
      _id: '2',
      title: 'Event 2',
      date: new Date(),
      venue: 'Venue 2',
    },
  ];

  const onDelete = jest.fn();
  const formPath = '/addEvent';

  it('should render the correct number of events', () => {
    const wrapper = shallow(
      <Events events={events} onDelete={onDelete} formPath={formPath} />
    );
    expect(wrapper.find(Event)).toHaveLength(events.length);
  });

  it('should pass the correct props to each Event component', () => {
    const wrapper = shallow(
      <Events events={events} onDelete={onDelete} formPath={formPath} />
    );
    wrapper.find(Event).forEach((node, index) => {
      expect(node.prop('event')).toEqual(events[index]);
      expect(node.prop('onDelete')).toEqual(onDelete);
      expect(node.prop('formPath')).toEqual(formPath);
    });
  });
});
