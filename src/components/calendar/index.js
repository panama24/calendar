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

const Events = ({ events, isShowing, toggle }) => !!events.length &&
  events.map(({
    description,
    endDate,
    endTime,
    startDate,
    startTime,
    title
  }) => {
    const copy = !!title ? `${title}: ${description}` : '(No title)';
    const eventClickHandler = e => {
      e.stopPropagation();
      console.log('click');
      // toggle();
    };

    // can I refactor to use same popover?
    // set what type of popover and an id or something?
    return (
      <>
        <Event key={`event-${title}`} onClick={e => eventClickHandler(e)}>
          {copy}
        </Event>
        <Popup key={`popup-${title}`} isShowing={isShowing} hide={toggle}>
          {title}
          {`${startDate}-${endDate}`}
          {`${startTime}-${endTime}`}
          {description}
        </Popup>
      </>
    )}
  );

const noop = () => ({});
const generatePopupId = number => `schedule-event-${number}`
const DayContainer = ({
  schedulingEvent,
  clickableDay,
  currentDate,
  scheduledEvents,
  selectedDay,
  formSubmissionHandler,
  isShowing,
  toggle,
  popupId,
  setId,
}) => {
  const isToday = currentDate.date() === clickableDay && moment().isSame(currentDate, 'month');
  const year = currentDate.year();
  const month = currentDate.month();
  const formatMonth = String(month).length > 1 ? month : `0${month}`;
  const formatDay = String(clickableDay).length > 1 ? clickableDay : `0${clickableDay}`;
  const dateStr = `${year}-${formatMonth}-${formatDay}`;
  const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

  const events = getDailyEvents(scheduledEvents, formatDate);

  const uniquePopupId = generatePopupId(clickableDay);
  const showPopup = isShowing && popupId === uniquePopupId;
  return (
    <>
      <Day onClick={() => { clickableDay ?  schedulingEvent(formatDate, uniquePopupId) : noop()}}>
        <DayNumber day={clickableDay} today={isToday} />
        <Events
          events={events}
          isShowing={isShowing}
          toggle={toggle}
        />
      </Day>
      <Popup
        hide={toggle}
        id={uniquePopupId}
        isShowing={showPopup}
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
  schedulingEvent,
  getToday,
  currentDate,
  navigate,
  numberOfDaysInMonth,
  scheduledEvents,
  startIdx,
  formSubmissionHandler,
  selectedDay,
  isShowing,
  toggle,
  popupId,
  setId,
}) => (
  <Grid>
    <div>
      <Header
        navigate={navigate}
        getToday={getToday}
        currentDate={currentDate}
      />
      <DaysOfWeek />
        {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((clickableDay, dayIdx) => (
              <DayContainer
                schedulingEvent={schedulingEvent}
                clickableDay={clickableDay}
                currentDate={currentDate}
                key={dayIdx}
                scheduledEvents={scheduledEvents}
                formSubmissionHandler={formSubmissionHandler}
                selectedDay={selectedDay}
                isShowing={isShowing}
                toggle={toggle}
                popupId={popupId}
                setId={setId}
              />
            ))}
          </Week>
        ))}
    </div>
  </Grid>
);

export default Calendar;
