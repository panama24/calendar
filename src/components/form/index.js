import React, { useState } from 'react';
import moment from 'moment';

import {
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
import { getNearestStartEndTimes } from '../../helpers';

const formatDate = date => moment(date).format('MMM DD, YYYY');

const TimeInputs = ({
  endTime,
  formValues,
  handleInputChange,
  startTime
}) => startTime ?  (
  <>
    <Time
      name="startTime"
      onChange={handleInputChange}
      placeholder={startTime}
      type="text"
      value={formValues.startTime || startTime}
    />-
    <Time
      name="endTime"
      onChange={handleInputChange}
      placeholder={endTime}
      type="text"
      value={formValues.endTime || endTime}
    />
  </>
) : (
  <>-</>
);

const Form = ({ formSubmissionHandler, selectedDay }) => {
  const [formValues, setFormValues] = useState({
      title: '',
      description: '',
      startDate: formatDate(selectedDay),
      endDate: formatDate(selectedDay),
      startTime: '',
      endTime: ''
  });

  const formattedDate = formatDate(selectedDay);

  const handleTimeSelect = () => {
    const { end, start } = getNearestStartEndTimes();
    setFormValues({
      ...formValues,
      startTime: start,
      endTime: end
    });
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <FormWrapper>
      <form>
        <TitleWrapper>
          <Title
            name="title"
            onChange={handleInputChange}
            placeholder='Add title'
            type="text"
            value={formValues.title}
          />
        </TitleWrapper>
        <div>
          <AddTimeWrapper>
            <div>
              <DateInput
                name="startDate"
                onChange={handleInputChange}
                placeholder={formattedDate}
                type="text"
                value={formValues.startDate}
              />
              <TimeInputs
                endTime={formValues.endTime}
                formValues={formValues}
                handleInputChange={handleInputChange}
                startTime={formValues.startTime}
              />
              <DateInput
                name="endDate"
                onChange={handleInputChange}
                placeholder={formattedDate}
                type="text"
                value={formValues.endDate}
              />
            </div>
            <Button
              type="button"
              hide={formValues.startTime}
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
              value={formValues.description}
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
