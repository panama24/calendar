import React from 'react';
import { Weekday, Weekdays } from './styles';

const daysOfWk = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DaysOfWeek = () => (
  <Weekdays>
    {daysOfWk.map((day, i) => (
      <Weekday key={`${day}-${i}`}>{day}</Weekday>
    ))}
  </Weekdays>
);

export default DaysOfWeek;
