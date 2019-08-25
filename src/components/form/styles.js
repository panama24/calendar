import styled, { keyframes } from 'styled-components';
import { Button } from '../shared/button';

const AddTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  margin: 0 0 36px 10px;
`;

const FormWrapper = styled.div`
  padding: 12px;
`;

const slideoutKeyframes = keyframes`
 0% {
    transform:scaleX(0);
    border-bottom: none;
  }

  100% {
    transform:scaleX(1);
    border-bottom: 2px solid dodgerBlue;
  }
`;

const Title = styled.input`
  border: none;
  border-bottom: 2px solid dodgerBlue;
  width: 99%;
  font-size: 24px;
  animation-duration: 0.5s;
  animation-name: ${slideoutKeyframes};

    &:focus {
      outline: none;
    }
`;

const DescriptionWrapper = styled.div`
  margin-top: 8px;
`;

const Description = styled.input`
  border: none;
  font-size: 12px;
  width: 50%;
  padding: 10px;
  margin-bottom: 0;

  &:hover {
    background: #eee;
    border-radius: 3px;
    padding: 10px;
  }

  &:focus {
    outline: none;
  }
`;

const DateInput = styled(Description)`
  border: none;
  font-size: 12px;
  width: 82px;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Save = styled(Button)`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 0.5rem 0;
  width: 80px;
  background: dodgerBlue;
  color: white;
  border: 2px solid white;
  height: 16px;

  &:hover {
    background: #4F94FB;
  }
`;

const Time = styled(DateInput)`
  width: 50px;
`;

export {
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
};
