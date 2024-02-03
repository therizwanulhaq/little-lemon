import React from "react";
import styled from "@emotion/styled";

export const PopupContainer = styled.div`
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0.5)"};
  background: white;
  border: 1px solid grey;
  border-radius: 0.3rem;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};

  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 0.3rem 0.3rem 0 0;
    transform: translateY(${({ isVisible }) => (isVisible ? "0" : "100%")});
  }
`;

export const PopupHeader = styled.div`
  background: #f0f2f2;
  padding: 1rem 1.5rem;
  font-size: 0.8rem;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
  border-radius: 0.3rem 0.3rem 0 0;
  justify-content: space-between;
`;

export const ClosePopUpIcon = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const PopupBody = styled.div`
  padding: 1rem 1.5rem;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  z-index: 2;
  background: #00000080;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const PopUp = ({ isVisible, togglePopup, title, children }) => {
  return (
    <>
      <PopupContainer isVisible={isVisible}>
        <PopupHeader>
          <h2>{title}</h2>
          <ClosePopUpIcon
            className="material-symbols-outlined"
            onClick={togglePopup}
          >
            close
          </ClosePopUpIcon>
        </PopupHeader>
        <PopupBody>{children}</PopupBody>
      </PopupContainer>
      <PopupOverlay isVisible={isVisible} onClick={togglePopup} />
    </>
  );
};

export default PopUp;
