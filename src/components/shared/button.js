import styled from 'styled-components';
import { DARK_GREY, GREY, HOVER_GREY, WHITE } from '../../constants/colors';

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
  color: ${DARK_GREY};
  border: 1px solid ${GREY};
  background: ${WHITE};
  padding: 0.5rem 0;

  &:hover {
    background: ${HOVER_GREY};
  }
`;

export { Button };
