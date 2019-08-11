import styled from 'styled-components';

const AddTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  line-height: 32px;
  font-size: 14px;
  padding: 10px;
  color: grey;

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
  font-size: 14px;
  width: 50%;
  padding: 10px;
  margin-bottom: 0;

  &:hover {
    background: #eee;
    border-radius: 3px;
    padding: 10px;
  }
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 0.5rem 0;
  width: 80px;
  background: dodgerBlue;
  color: white;
  border: 2px solid white;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddTimeButton = styled(Button)`
  align-items: center;
  width: 60px;
  height: 8px;
  font-size: 10px;
  font-weight: bold;
  color: grey;
  border: 1px solid #ccc;
  background: white;
  margin-left: 104px;
  padding: 0.5rem 0;

  &:hover {
    background: #eee;
  }
`;

export {
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
};
