import React, { useRef, useState } from 'react';
import moment from 'moment';
import Events from './events';
import { Day, Number, NumberWrapper } from './styles';
import Form from '../form';
import Popup from '../popup';
import { getDailyEvents } from '../../helpers';

const DayNumber = ({ day, today }) => day && (
  <NumberWrapper>
    <Number today={today}>
      {day}
    </Number>
  </NumberWrapper>
);

const noop = () => ({});
const DayContainer = ({
  clickableDay,
  currentDate,
  formSubmissionHandler,
  isShowing,
  popupId,
  schedulingEvent,
  scheduledEvents,
  selectedDay,
  setId,
  toggle,
  viewingEvent,
}) => {
  const [clientRect, setClientRect] = useState({});
  const inputEl = useRef(null);

  const isToday = currentDate.date() === clickableDay && moment().isSame(currentDate, 'month');
  const year = currentDate.year();
  const month = currentDate.month();
  const formatMonth = String(month).length > 1 ? month : `0${month}`;
  const formatDay = String(clickableDay).length > 1 ? clickableDay : `0${clickableDay}`;
  const dateStr = `${year}-${formatMonth}-${formatDay}`;
  const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

  const events = getDailyEvents(scheduledEvents, formatDate);
  const uniquePopupId = `schedule-event-${clickableDay}`;

  const clickHandler = () => {
    const clientRectObj = inputEl.current.getBoundingClientRect();
    setClientRect(clientRectObj);
    schedulingEvent(formatDate, uniquePopupId);
  };

  return (
    <>
      <Day ref={inputEl} onClick={() => { clickableDay ?  clickHandler() : noop()}}>
        <DayNumber day={clickableDay} today={isToday} />
        <Events
          clickableDay={clickableDay}
          events={events}
          isShowing={isShowing}
          popupId={popupId}
          toggle={toggle}
          viewingEvent={viewingEvent}
        />
      </Day>
      <Popup
        hide={toggle}
        id={uniquePopupId}
        isShowing={isShowing}
        openId={popupId}
        clientRect={clientRect}
      >
        <Form
          formSubmissionHandler={formSubmissionHandler}
            selectedDay={selectedDay}
          />
      </Popup>
    </>
  );
};

export default DayContainer;
