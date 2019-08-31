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

const PlaceholderEvent = ({ toggleEventAction }) => {
  console.log(toggleEventAction);
  const styles = {};
  return (
    <Event {...styles}>
      {toggleEventAction.type === 'time' && <EventIcon size='10px' />}
      {toggleEventAction.start || ''}
      {toggleEventAction.title || '(No Title)'}
    </Event>
  );
};

const ScheduledEvents = ({
  clickableDay,
  events,
  isShowing,
  popupId,
  toggle,
  toggleEventAction,
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
            <EventIcon size='18px' radius='24%' />
            <TextWrapper>
              <span>{title}</span>
              <span>{`${startDate}-${endDate}`} - {`${startTime}-${endTime}`}</span>
            </TextWrapper>
          </EventLockup>
          <EventLockup>
            <EventIcon size='18px' radius='24%' />
            <span>{description}</span>
          </EventLockup>
        </ViewEventBody>
      </Popup>
    </>
  )}
);

export {
  PlaceholderEvent,
  ScheduledEvents,
};
