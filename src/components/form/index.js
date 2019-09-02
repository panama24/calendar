import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  ActionButton,
  ActionsWrapper,
  AddTimeWrapper,
  DateInput,
  Description,
  DescriptionWrapper,
  FormWrapper,
  Save,
  SubmitWrapper,
  Time,
  Title,
  TitleWrapper,
} from './styles';

import { Button } from '../shared/button';

const TimeInputs = ({ endTime, handleInputChange, startTime }) => startTime ?  (
  <>
    <Time
      name='startTime'
      onChange={handleInputChange}
      placeholder={startTime}
      type='text'
      value={startTime}
    />-
    <Time
      name='endTime'
      onChange={handleInputChange}
      placeholder={endTime}
      type='text'
      value={endTime}
    />
  </>
  ) : (
  <>-</>
);

const getStartEndDates = day => {
  const now = moment();
  const remainder = 30 - (moment(now).minute() % 30);
  const start = moment(now)
    .add(remainder, 'minutes')
    .format('h:mm a');

  let dateStr = day,
    timeStr = start,
    startDate    = moment(dateStr),
    time    = moment(timeStr, 'hh:mm a');

  startDate.set({
    hour:   time.get('hour'),
    minute: time.get('minute'),
    second: time.get('second')
  });

  const endDate = moment(startDate).add(1, 'hour');

  return {
    startDate,
    endDate,
  };
};

const initialState = day => ({
  title: '',
  description: '',
  startDate: day,
  endDate: day,
  startTime: '',
  endTime: '',
});

const Form = ({ clearFormValues, formSubmissionHandler, day, togglingEventAction }) => {
  const [formValues, setFormValues] = useState(initialState(day));

  useEffect(() => {
    return () => clearFormValues();
  }, []);

  const handleTimeSelect = () => {
    const { endDate, startDate } = getStartEndDates(day);
    const formatStart = moment(startDate).format('hh:mm a');
    const formatEnd = moment(endDate).format('hh:mm a');

    togglingEventAction({ end: formatEnd, start: formatStart })

    setFormValues({
      ...formValues,
      endDate,
      startDate,
      startTime: formatStart,
      endTime: formatEnd,
    });
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const {
    description,
    endDate,
    endTime,
    startDate,
    startTime,
    title,
    } = formValues;
  return (
    <FormWrapper>
      <form>
        <TitleWrapper>
          <Title
            name="title"
            onBlur={e => togglingEventAction({ [e.target.name]: e.target.value })}
            onChange={handleInputChange}
            placeholder='Add title and time'
            type="text"
            value={title}
          />
        </TitleWrapper>
        <ActionsWrapper>
          <ActionButton onClick={() => togglingEventAction({ type: 'event' })}>
            Event
          </ActionButton>
          <ActionButton onClick={() => togglingEventAction({ type: 'reminder' })}>
            Reminder
          </ActionButton>
          <ActionButton onClick={() => togglingEventAction({ type: 'task' })}>
            Task
          </ActionButton>
        </ActionsWrapper>
        <div>
          <AddTimeWrapper>
            <div>
              <DateInput
                name="startDate"
                onChange={handleInputChange}
                placeholder={moment(startDate).format('MMM DD, YYYY')}
                type="text"
                value={moment(startDate).format('MMM DD, YYYY')}
              />
              <TimeInputs
                endTime={endTime}
                formValues={formValues}
                handleInputChange={handleInputChange}
                startTime={startTime}
              />
              <DateInput
                name="endDate"
                onChange={handleInputChange}
                placeholder={moment(endDate).format('MMM DD, YYYY')}
                type="text"
                value={moment(endDate).format('MMM DD, YYYY')}
              />
            </div>
            <Button
              type="button"
              hide={startTime}
              onClick={() => handleTimeSelect()}>
              Add Time
            </Button>
          </AddTimeWrapper>
          <DescriptionWrapper>
            <Description
              name="description"
              onChange={handleInputChange}
              placeholder='Add description'
              type="text"
              value={description}
            />
          </DescriptionWrapper>
        </div>
        <SubmitWrapper>
          <Save
            type="submit"
            value="Submit"
            onClick={() => formSubmissionHandler(formValues)}>
            Save
          </Save>
        </SubmitWrapper>
      </form>
    </FormWrapper>
  );
};

export default Form;
