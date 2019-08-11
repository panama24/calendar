import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
`;

const Body = styled.div`
  padding: 6px 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
`;

const Close = styled.button`
  color: black;
  font-weight: bold;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const CloseWrapper = styled.span`
  align-self: flex-end;
  margin-right: 6px;
`;

export {
  Body,
  Close,
  CloseWrapper,
  ModalContainer,
}
