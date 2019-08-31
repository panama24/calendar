import React from 'react';

import { calculatePosition } from './helpers';
import {
  Body,
  Close,
  CloseWrapper,
  PopupContainer,
} from './styles';

const POPUP_WIDTH = 400;
const TOP_OFFSET = 36;

const Popup = ({
  children,
  clientRect = {},
  dayIdx: colIdx,
  hide,
  isOpen,
}) => {
  const { left, top } = calculatePosition({
    clientRect,
    colIdx,
    popupWidth: POPUP_WIDTH,
    topOffset: TOP_OFFSET,
  });

  return isOpen ?  (
    <PopupContainer left={left} top={top}>
      <Body>
        <CloseWrapper>
          <Close type="button" onClick={hide}>
            <span>X</span>
          </Close>
        </CloseWrapper>
        {children}
      </Body>
    </PopupContainer>
  ) : null;
};

export default Popup;
