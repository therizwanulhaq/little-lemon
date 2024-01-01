import React, { useState } from "react";
import {
  Preferences,
  DisplayedOptions,
  ExpandIcon,
  PreferencesContent,
  LoaderContainer,
  DeleteConfirmation,
  StyledButtons,
  SelectedOptions,
  PreferencesContainer,
  Options,
  SaveButton,
} from "./StyledComponents";

import { updateDoc, deleteField, doc } from "@firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import { css } from "@emotion/css";
import Loader from "../auth/Loader";
import PopUp from "../common/PopUp";

const Accordion = ({ title, popupTitle, popupOptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, userData } = useAuth();

  const handlePreferenceClick = (preference) => {
    setSelectedPreference(
      selectedPreference === preference ? null : preference
    );
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDeleteConfirmation = () => {
    setIsDisplayed(!isDisplayed);
  };

  const togglePopup = () => {
    if (userData?.[fieldName]) {
      setSelectedPreference(userData?.[fieldName]);
    } else {
      // If no stored value, reset selectedPreference
      setSelectedPreference(null);
    }
    setAddPopupVisible(!isAddPopupVisible);
    document.body.style.overflow = isAddPopupVisible ? "auto" : "hidden";
  };

  const convertToCamelCase = (title) => {
    // Remove spaces and convert to camelCase
    return title.replace(/\s+(.)/g, (match, group) => group.toUpperCase());
  };

  const convertToFieldName = (title) => {
    const camelCaseTitle = convertToCamelCase(title);
    // Ensure the first character is lowercase
    return camelCaseTitle.charAt(0).toLowerCase() + camelCaseTitle.slice(1);
  };

  const fieldName = convertToFieldName(title);

  // Update user data in Firestore
  const updateUserData = async (fieldName, fieldValue, operation) => {
    try {
      setIsLoading(true); // Set loading to true when the operation starts

      const userDocRef = doc(db, "users", user.uid);

      // Perform the specified operation (update or delete)
      const updateData =
        operation === "update"
          ? { [fieldName]: fieldValue }
          : { [fieldName]: deleteField() };

      // Update or delete the user document based on the operation
      await updateDoc(userDocRef, updateData);

      console.log(
        `User data ${
          operation === "update" ? "updated" : "field deleted"
        } successfully`
      );
    } catch (error) {
      console.error(
        `Error ${operation === "update" ? "updating" : "deleting"} user data:`,
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const submitUserData = async () => {
    try {
      await updateUserData(fieldName, selectedPreference || "", "update");
    } catch (error) {}
  };

  const deleteUserDataField = async () => {
    try {
      await updateUserData(fieldName, null, "delete");
    } catch (error) {}
  };

  return (
    <div>
      <Preferences onClick={handleToggle}>
        {title}
        <DisplayedOptions expanded={isExpanded}>
          {userData?.[fieldName] ? userData?.[fieldName] : "--"}
        </DisplayedOptions>
        <ExpandIcon className="material-symbols-outlined" expanded={isExpanded}>
          expand_more
        </ExpandIcon>
      </Preferences>
      <PreferencesContent expanded={isExpanded}>
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : isDisplayed ? (
          <DeleteConfirmation displayed={isDisplayed}>
            <h3
              className={css`
                font-weight: 700;
                font-size: 1rem;
                line-height: 2rem;
              `}
            >
              Are you sure you want to clear {title} data?
            </h3>
            <p
              className={css`
                font-size: 0.8rem;
                font-weight: 500;
                line-height: 2rem;
              `}
            >
              By clearing this data, your personalized Little Lemon experiences
              will be affected.
            </p>
            <div>
              <StyledButtons onClick={toggleDeleteConfirmation}>
                No, cancel
              </StyledButtons>
              <StyledButtons
                onClick={() => {
                  deleteUserDataField();
                  toggleDeleteConfirmation();
                }}
              >
                Yes, clear my data
              </StyledButtons>
            </div>
          </DeleteConfirmation>
        ) : (
          <SelectedOptions>
            <p>{userData?.[fieldName] ? userData?.[fieldName] : "--"}</p>

            {userData?.[fieldName] ? (
              <>
                <StyledButtons onClick={togglePopup}>Edit</StyledButtons>
                <StyledButtons onClick={toggleDeleteConfirmation}>
                  Delete
                </StyledButtons>
              </>
            ) : (
              <StyledButtons onClick={togglePopup}>Add</StyledButtons>
            )}
          </SelectedOptions>
        )}

        <PopUp
          title={title}
          isVisible={isAddPopupVisible}
          togglePopup={togglePopup}
        >
          <h3>{popupTitle}</h3>
          <PreferencesContainer>
            {popupOptions.map((preference) => (
              <Options
                key={preference}
                onClick={() => handlePreferenceClick(preference)}
                selected={preference === selectedPreference}
              >
                {preference}
              </Options>
            ))}
          </PreferencesContainer>
          <SaveButton
            disabled={!selectedPreference}
            onClick={() => {
              submitUserData();
              togglePopup();
            }}
          >
            Save
          </SaveButton>
        </PopUp>
      </PreferencesContent>
    </div>
  );
};

export default Accordion;
