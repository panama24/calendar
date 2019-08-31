import React from 'react';
import {
  Action,
  Event,
  EventIcon,
  EventLockup,
  TextWrapper,
  Toolbar,
  ViewEventBody,
} from './styles';
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
        isOpen={isShowing && (popupId ===  uniquePopupId)}
      >
        <ViewEventBody>
          <Toolbar>
            <Action>edit</Action>
            <Action>delete</Action>
          </Toolbar>
          <EventLockup>
            <EventIcon />
            <TextWrapper>
              <span>{title}</span>
              <span>{`${startDate}-${endDate}`} - {`${startTime}-${endTime}`}</span>
            </TextWrapper>
          </EventLockup>
          <EventLockup>
            <EventIcon />
            <span>{description}</span>
          </EventLockup>
        </ViewEventBody>
      </Popup>
    </>
  )}
);

export default Events;
