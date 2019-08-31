import styled from 'styled-components';

const PopupContainer = styled.div`
  position: absolute;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  display: inline-block;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  z-index: 2;
  width: 416px;
  padding: 12px;
  left: ${({ left }) => left ? `${left}px` : 0};
  top: ${({ top }) => top ? `${top}px` : 0};
`;

const Body = styled.div`
  padding: 6px 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  PopupContainer,
}
