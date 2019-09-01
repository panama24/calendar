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

const DARK_GREY = '#696969';
const LIGHT_GREY = 'WhiteSmoke';
const WHITE = '#FFFFFF';

const colors = {
  event: 'dodgerBlue',
  reminder: '#3333FF',
  task: '#33CCFF',
};

const hoverColors = {
  event: '#1476d4',
  reminder: '#4D4DFF',
  task: '#00BFFF',
};

const PlaceholderEvent = ({ toggleEventAction }) => {
  const title = toggleEventAction.title;
  const startTime = toggleEventAction.start;
  const eventType = toggleEventAction.type;

  const styles = {
    bgColor: startTime ? WHITE : colors[eventType],
    color: startTime ? DARK_GREY : WHITE,
    boxShadow: startTime ? '0 3px 7px rgba(0, 0, 0, 0.3)' : 'none',
    hoverBgColor: startTime ? LIGHT_GREY : hoverColors[eventType],
    hoverColor: startTime ? DARK_GREY : LIGHT_GREY,
  };

  return (
    <Event {...styles}>
      {startTime ? (
        <span>
          <EventIcon size='10px' color={colors[eventType]} />
          <TextWrapper>{startTime}</TextWrapper>
          {title || ''}
        </span>
      ) : (
        <span>{title || '(No Title)'}</span>
      )}
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

  const styles = {
    bgColor: startTime ? WHITE : colors.event,
    color: startTime ? DARK_GREY : WHITE,
    boxShadow: startTime ? '0 3px 7px rgba(0, 0, 0, 0.3)' : 'none',
    hoverBgColor: startTime ? LIGHT_GREY : hoverColors.event,
    hoverColor: startTime ? DARK_GREY : LIGHT_GREY,
  };

  return (
    <>
      <Event {...styles} key={uniquePopupId} onClick={e => eventClickHandler(e)}>
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
