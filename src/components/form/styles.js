import styled from 'styled-components';
import { Button } from '../shared/button';

const AddTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  line-height: 32px;
  font-size: 12px;
  padding: 10px;
  color: #696969;

  &:hover {
    background: #eee;
    border-radius: 3px;
    padding: 10px;
  }
`;

const TitleWrapper = styled.div`
  margin: 0 0 36px 10px;
`;

const FormWrapper = styled.div`
  padding: 12px;
`;

const Title = styled.input`
  border: none;
  border-bottom: 2px solid dodgerBlue;
  width: 50%;
  font-size: 24px;

    &:focus {
      outline: none;
    }
`;

const DescriptionWrapper = styled.div`
  margin-top: 8px;
`;

const Description = styled(Title)`
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

export {
  AddTimeWrapper,
  Description,
  DescriptionWrapper,
  FormWrapper,
  Save,
  SubmitWrapper,
  Text,
  Title,
  TitleWrapper,
};
