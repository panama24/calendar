import React from 'react';
import moment from 'moment';
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
            color={colors[eventType]}
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
}) => !!events.length &&
  events.map(({ description, end_date_time, id: eventId, start_date_time, title, type }) => {
    const startDate = moment(start_date_time).format('MMM DD, YYYY');
    const endDate = moment(end_date_time).format('MMM DD, YYYY');
    const startTime = moment(start_date_time).format('HH:mm') === '00:00' ? null : moment(start_date_time).format('HH:mm a');
    const endTime = moment(end_date_time).format('HH:mm') === '00:00' ? null : moment(end_date_time).format('HH:mm a');

    // if event spans only one day
    // Tuesday, February 11, 2019 - 10:00am - 11:00am
    // if spans multiple days
    // February 11, 2020, 10:00am = February 14, 2020, 11:00am


    // handle events spanning multiple days in UI

    const eventClickHandler = (e, action) => {
      e.stopPropagation();
      viewingEvent(uniquePopupId);
    };

    const styles = {
      bgColor: startTime ? WHITE : colors[type],
      color: startTime ? DARK_GREY : WHITE,
      boxShadow: startTime ? '0 3px 7px rgba(0, 0, 0, 0.3)' : 'none',
      hoverBgColor: startTime ? LIGHT_GREY : hoverColors[type],
      hoverColor: startTime ? DARK_GREY : LIGHT_GREY,
    };

    const uniquePopupId = `view-event-${clickableDay}`;

    const editClickHandler = e => {
      e.stopPropagation();
      console.log('edit');
    };

    const deleteClickHandler = (e) => {
      e.stopPropagation();
      deleteEvent(eventId);
    };

    return (
    <>
      <Event {...styles} key={uniquePopupId} onClick={e => eventClickHandler(e)}>
        {startTime ? (
          <div>
            <EventIcon
              size='10px'
              color={colors[type]}
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
                    color={colors[type]}
                    radius='25%'
                    margin='16px 0 0 0'
                  />
                </IconWrapper>
                <Spacer margin='0 0 0 24px'>
                  <div>
                    <TextWrapper fontSize='24px'>{title || '(No Title)'}</TextWrapper>
                  </div>
                  <div>
                    <TextWrapper fontSize='14px'>{`${startDate}-${endDate}`}
                      {startTime && <span>- {`${startTime}-${endTime}`}</span>}
                    </TextWrapper>
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
