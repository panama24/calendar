import styled, { keyframes } from 'styled-components';
import { Button } from '../shared/button';
import { DARK_GREY, GREY, HOVER_GREY, PRIMARY_BLUE, WHITE } from '../../constants/colors';

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
    border-bottom: 2px solid ${PRIMARY_BLUE};
  }
`;

const Title = styled.input`
  border: none;
  border-bottom: 2px solid ${PRIMARY_BLUE};
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

const ActionButton = styled.div`
  border-radius: 3px;
  font-size: 14px;
  padding: 8px 6px;
  margin-bottom: 0;
  margin-left: 8px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #F0F8FF;
    border-radius: 3px;
    padding: 8px 6px;
    cursor: pointer;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin-bottom: 18px;
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
  background: ${PRIMARY_BLUE};
  color: white;
  border: 2px solid ${WHITE};
  height: 16px;

  &:hover {
    background: #4F94FB;
  }
`;

const Time = styled(DateInput)`
  width: 50px;
`;

export {
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
};
