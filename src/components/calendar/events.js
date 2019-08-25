import React from 'react';
import { Event } from './styles';
import Popup from '../popup';

const Events = ({
  clickableDay,
  events,
  isShowing,
  popupId,
  toggle,
  viewingEvent,
}) => !!events.length && events.map(({
  description,
  endDate,
  endTime,
  startDate,
  startTime,
  title
}) => {
  const copy = !!title ? `${title}: ${description}` : '(No title)';
  const uniquePopupId = `view-event-${clickableDay}`;

  const eventClickHandler = e => {
    e.stopPropagation();
    viewingEvent(uniquePopupId);
  };

  return (
    <>
      <Event key={uniquePopupId} onClick={e => eventClickHandler(e)}>
        {copy}
      </Event>
        <Popup
          hide={toggle}
          id={uniquePopupId}
          isShowing={isShowing}
          openId={popupId}
        >
          {title}
          {`${startDate}-${endDate}`}
          {`${startTime}-${endTime}`}
          {description}
      </Popup>
    </>
  )}
);

export default Events;
