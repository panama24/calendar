import React from 'react';
import {
  Action,
  Event,
  EventIcon,
  EventLockup,
  IconWrapper,
  Line,
  Spacer,
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

const PlaceholderEvent = ({ eventAction }) => {
  const { title, start: startTime, type: eventType } = eventAction;

  const styles = {
    bgColor: startTime ? WHITE : colors[eventType],
    color: startTime ? DARK_GREY : WHITE,
    boxShadow: startTime ? '0 3px 7px rgba(0, 0, 0, 0.3)' : 'none',
    hoverBgColor: startTime ? LIGHT_GREY : hoverColors[eventType],
    hoverColor: startTime ? DARK_GREY : LIGHT_GREY,
  };

  return (
    <Event {...styles} onClick={e => e.stopPropagation()}>
      {startTime ? (
        <span>
          <EventIcon
            size='10px'
            color={colors.event}
            margin='0 6px 0 0'
          />
          <TextWrapper margin='0 6px 0 0'>{startTime}</TextWrapper>
          {title || ''}
        </span>
      ) : (
        <span>{title || '(No Title)'}</span>
      )}
    </Event>
  );
};

const DescriptionIcon = () => (
  <>
    <Line width='14px' />
    <Line width='14px' />
    <Line width='10px' />
  </>
);

const ScheduledEvents = ({
  clickableDay,
  deleteEvent,
  eventAction,
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
  const eventClickHandler = (e, action) => {
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

  const uniquePopupId = `view-event-${clickableDay}`;

  const editClickHandler = e => {
    e.stopPropagation();
    console.log('edit');
  };

  const deleteClickHandler = (e) => {
    e.stopPropagation();
    // deleteEvent(id);
  };

  return (
    <>
      <Event {...styles} key={uniquePopupId} onClick={e => eventClickHandler(e)}>
        {startTime ? (
          <div>
            <EventIcon
              size='10px'
              color={colors.event}
              margin='0 6px 0 0'
            />
            <TextWrapper margin='0 6px 0 0'>{startTime}</TextWrapper>
            {title || '(No Title)'}
          </div>
        ) : (
          <div>{title || '(No Title)'}</div>
        )}
      </Event>
      <Popup
        hide={toggle}
        isOpen={isShowing && (popupId ===  uniquePopupId)}
      >
        <ViewEventBody>
          <Toolbar>
            <Action onClick={e => editClickHandler(e)}>edit</Action>
            <Action onClick={e => deleteClickHandler(e)}>delete</Action>
          </Toolbar>
          <EventLockup>
            <div>
              <EventLockup>
                <IconWrapper>
                  <EventIcon
                    size='14px'
                    color={colors.event}
                    radius='25%'
                    margin='16px 0 0 0'
                  />
                </IconWrapper>
                <Spacer margin='0 0 0 24px'>
                  <div>
                    <TextWrapper fontSize='24px'>{title || '(No Title)'}</TextWrapper>
                  </div>
                  <div>
                    <TextWrapper fontSize='14px'>{`${startDate}-${endDate}`} - {`${startTime}-${endTime}`}</TextWrapper>
                  </div>
                </Spacer>
              </EventLockup>
            </div>
          </EventLockup>
          <EventLockup>
            <IconWrapper>
              <DescriptionIcon />
            </IconWrapper>
            <Spacer margin='0 0 0 24px'>
              <span>{description}</span>
            </Spacer>
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
