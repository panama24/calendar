import moment from 'moment';

// defaults to current month
const getNumberOfDaysInMonth = (date = null) => moment(date).daysInMonth();
const getNearestStartEndTimes = () => {
  const now = moment();
  const remainder = 30 - (moment(now).minute() % 30);

  const start = moment(now)
    .add(remainder, 'minutes')
    .format('h:mma');

  const end = moment(now)
    .add(remainder, 'minutes')
    .add(1, 'hour')
    .format('h:mma');

  return {
    end,
    start,
  };
};

// both must be moment objs - moment1 = moment(...);
const isSameDay = (moment1, moment2) =>
  moment1.date() === moment2.date() &&
    moment1.month() === moment2.month() &&
    moment1.year() === moment2.year();

// day must have this format: moment(day, 'YYYY-MM-DD') and
// in some cases, append `.add(1, 'month')` bc month is 0 indexed
const getDailyEvents = (events, day) => events.filter(({ startDate }) => {
  const start = moment(startDate, 'MMM DD, YYYY')
    .format('YYYY-MM-DD');;

  const startMoment = moment(start);

  return isSameDay(startMoment, day);
});

export {
  getDailyEvents,
  getNearestStartEndTimes,
  getNumberOfDaysInMonth,
  isSameDay,
};
