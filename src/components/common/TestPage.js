import React, { useState } from "react";
import { Main } from "../profile/StyledComponents";
import PopUpComponent from "./PopUp";

const TestPage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const handleTogglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };
  return (
    <Main>
      <p>TEST PAGE</p>
      <button onClick={handleTogglePopUp}>PopUp</button>
      <PopUpComponent
        isVisible={isPopUpVisible}
        togglePopup={handleTogglePopUp}
        title="Your Popup Title"
      >
        <p>body</p>
      </PopUpComponent>
    </Main>
  );
};

export default TestPage;
