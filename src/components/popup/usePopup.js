import { useState } from 'react';

const usePopup = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [popupId, setPopupId] = useState(null);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function setId(id) {
    setPopupId(id);
  }

  return {
    isShowing,
    popupId,
    setId,
    toggle,
  }
};

export default usePopup;

