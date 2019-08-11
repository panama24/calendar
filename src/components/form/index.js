import React from 'react';

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

const Form = () => (
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
            <Text>Start Date</Text>-
            <Text>End Date</Text>
          </div>
          <AddTimeButton type="submit">Add Time</AddTimeButton>
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

export default Form;
