import styled from 'styled-components';

const Button = styled.a`
  cursor: pointer;
  display: ${({ hide }) => hide ? 'none' : 'flex'};
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  width: 60px;
  height: 8px;
  font-size: 10px;
  font-weight: bold;
  color: grey;
  border: 1px solid #ccc;
  background: white;
  padding: 0.5rem 0;

  &:hover {
    background: #eee;
  }
`;

export { Button };
