import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  AddTimeButton,
  AddTimeWrapper,
  Button,
  Description,
  DescriptionWrapper,
  FormWrapper,
  SubmitWrapper,
  Text,
  Title,
  TitleWrapper,
} from './styles';

const Form = ({ selectedDay }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const formattedDate = moment(selectedDay).format('MMM DD, YYYY');

  const handleTimeSelect = () => {
    const now = moment();
    const remainder = 30 - (now.minute() % 30);
    const nearestStartTime = now.add(remainder, 'minutes').format('h:mma');
    const nearestEndTime = now.add(remainder, 'minutes').add(1, 'hour').format('h:mma');

    setStartTime(nearestStartTime);
    setEndTime(nearestEndTime);
  }

  return (
    <FormWrapper>
      <form>
        <TitleWrapper>
          <Title
            name="title"
            placeholder='Add title'
            type="text"
          />
        </TitleWrapper>
        <div>
          <AddTimeWrapper>
            <div>
              <Text>{formattedDate}</Text>-
              {!!startTime && (
                <>
                  <Text>{startTime}</Text>-
                  <Text>{endTime}</Text>
                </>
              )}
              <Text>{formattedDate}</Text>
            </div>
            <AddTimeButton type="button" onClick={() => handleTimeSelect()}>Add Time</AddTimeButton>
          </AddTimeWrapper>
          <DescriptionWrapper>
            <Description
              name="description"
              placeholder='Add description'
              type="text"
            />
          </DescriptionWrapper>
        </div>
        <SubmitWrapper>
          <Button type="submit" value="Submit">Save</Button>
        </SubmitWrapper>
      </form>
    </FormWrapper>
  );
};

export default Form;
