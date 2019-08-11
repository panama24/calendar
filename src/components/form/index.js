import React from 'react';
import styled from 'styled-components';

const Form = () => (
  <Wrapper>
    <form>
      <Label>
        <StyledTextInput
          name="title"
          placeholder='Add title'
          type="text"
        />
      </Label>
      <Button type="submit" value="Submit">Save</Button>
    </form>
  </Wrapper>
);

export default Form;

const Wrapper = styled.div`
  padding: 12px;
  border: 1px solid red;
`;

const Label = styled.label`
  color: red;
  margin-right: 24px;
`;

const StyledTextInput = styled.input`
  border: none;
  border-bottom: 2px solid dodgerBlue;
  width: 100%;
  line-height: 24px;
  font-size: 24px;
  margin-bottom: 12px;

    &:focus {
      outline: none;
    }
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 6rem;
  background: dodgerBlue;
  color: white;
  border: 2px solid white;
`;
