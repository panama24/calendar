import React from 'react';
import moment from 'moment';
import DaysOfWeek from './weekdays';
import Header from './header';
import { generateWeeksArray } from './helpers';
import {
  Day,
  Grid,
  Event,
  Number,
  NumberWrapper,
  Week,
} from './styles';

import Popup from '../popup';
import Form from '../form';
import { getDailyEvents } from '../../helpers';

const DayNumber = ({ day, today }) => day && (
  <NumberWrapper>
    <Number today={today}>
      {day}
    </Number>
  </NumberWrapper>
);

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
  const isToday = currentDate.date() === clickableDay && moment().isSame(currentDate, 'month');
  const year = currentDate.year();
  const month = currentDate.month();
  const formatMonth = String(month).length > 1 ? month : `0${month}`;
  const formatDay = String(clickableDay).length > 1 ? clickableDay : `0${clickableDay}`;
  const dateStr = `${year}-${formatMonth}-${formatDay}`;
  const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

  const events = getDailyEvents(scheduledEvents, formatDate);

  const uniquePopupId = `schedule-event-${clickableDay}`;
  return (
    <>
      <Day onClick={() => { clickableDay ?  schedulingEvent(formatDate, uniquePopupId) : noop()}}>
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
      >
        <Form
          formSubmissionHandler={formSubmissionHandler}
            selectedDay={selectedDay}
          />
      </Popup>
    </>
  );
};

const Calendar = ({
  currentDate,
  formSubmissionHandler,
  getToday,
  isShowing,
  navigate,
  numberOfDaysInMonth,
  popupId,
  schedulingEvent,
  scheduledEvents,
  selectedDay,
  setId,
  startIdx,
  toggle,
  viewingEvent,
}) => (
  <Grid>
    <div>
      <Header
        getToday={getToday}
        currentDate={currentDate}
        navigate={navigate}
      />
      <DaysOfWeek />
        {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((clickableDay, dayIdx) => (
              <DayContainer
                clickableDay={clickableDay}
                currentDate={currentDate}
                formSubmissionHandler={formSubmissionHandler}
                isShowing={isShowing}
                key={dayIdx}
                popupId={popupId}
                scheduledEvents={scheduledEvents}
                schedulingEvent={schedulingEvent}
                selectedDay={selectedDay}
                setId={setId}
                toggle={toggle}
                viewingEvent={viewingEvent}
              />
            ))}
          </Week>
        ))}
    </div>
  </Grid>
);

export default Calendar;
