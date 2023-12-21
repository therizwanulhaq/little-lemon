import React, { useState } from "react";
import {
  ClosePopUpIcon,
  ExpandIcon,
  Popup,
  PopupBody,
  PopupHeader,
  PopupOverlay,
  Preferences,
  PreferencesContainer,
  PreferencesContent,
  SaveButton,
  StyledButtons,
  DisplayedOptions,
  DeleteConfirmation,
  SelectedOptions,
  Options,
} from "./StyledComponents";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  deleteField,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import { css } from "@emotion/css";
import Loader from "./Loader";

const PreferenceTile = ({
  title,
  popupTitle,
  popupOptions,
  selectedOptions,
  displayedOptions,
  onSelectedPreferenceChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const { user } = useAuth();

  const handlePreferenceClick = (preference) => {
    setSelectedPreference(
      selectedPreference === preference ? null : preference
    );
    onSelectedPreferenceChange(preference); // Notify the parent component of the change
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDeleteConfirmation = () => {
    setIsDisplayed(!isDisplayed);
  };

  const toggleAddPopup = () => {
    setAddPopupVisible(!isAddPopupVisible);
    // Toggle the overflow property to disable or enable scrolling
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

  const submitUserData = async () => {
    try {
      setIsLoading(true); // Set loading to true when the operation starts
      const usersCollection = collection(db, "users");

      // Find the user document by UID
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (userDocs.size > 0) {
        const userDoc = userDocs.docs[0];

        // Update the user document with the selected preference
        await updateDoc(userDoc.ref, {
          [fieldName]: selectedPreference || "", // Dynamic field based on the title prop
        });

        console.log("User data updated successfully");
      } else {
        console.log("User data not found in Firestore");
      }

      // Additional code if needed after updating user data
    } catch (error) {
      console.error("Error updating user data:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false when the operation completes (success or error)
    }
  };

  const deleteUserDataField = async () => {
    try {
      setIsLoading(true); // Set loading to true when the operation starts

      const usersCollection = collection(db, "users");

      // Find the user document by UID
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (userDocs.size > 0) {
        const userDoc = userDocs.docs[0];

        // Check if the field exists before attempting to delete
        if (userDoc.data()[fieldName]) {
          // Update the user document to delete the field
          await updateDoc(userDoc.ref, {
            [fieldName]: deleteField(),
          });

          console.log("User data field deleted successfully");
          // Manually update the component state to reflect the changes
          setSelectedPreference(null);
          // Notify the parent component of the change
          onSelectedPreferenceChange(null);
        } else {
          console.log("Field does not exist in user data");
        }
      } else {
        console.log("User data not found in Firestore");
      }

      // Additional code if needed after deleting the user data field
    } catch (error) {
      console.error("Error deleting user data field:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false when the operation completes (success or error)
    }
  };

  return (
    <div>
      <Preferences onClick={handleToggle}>
        {title}
        <DisplayedOptions expanded={isExpanded}>
          {selectedOptions
            ? selectedOptions
            : displayedOptions
            ? displayedOptions
            : "--"}
        </DisplayedOptions>
        <ExpandIcon className="material-symbols-outlined" expanded={isExpanded}>
          expand_more
        </ExpandIcon>
      </Preferences>
      <PreferencesContent expanded={isExpanded}>
        {isLoading ? (
          <div
            className={css`
              padding-bottom: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Loader />
          </div>
        ) : isDisplayed ? (
          <DeleteConfirmation displayed={isDisplayed}>
            <h3
              className={css`
                font-weight: 700;
                font-size: 1.2rem;
                line-height: 1.5rem;
              `}
            >
              Are you sure you want to clear {title} data?
            </h3>
            <p
              className={css`
                font-size: 0.8rem;
                line-height: 1.2rem;
              `}
            >
              By clearing this data, your personalised Little Lemon experiences
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
            <p>
              {selectedOptions
                ? selectedOptions
                : displayedOptions
                ? displayedOptions
                : "--"}
            </p>

            {displayedOptions || selectedOptions ? (
              <>
                <StyledButtons onClick={toggleAddPopup}>Edit</StyledButtons>
                <StyledButtons onClick={toggleDeleteConfirmation}>
                  Delete
                </StyledButtons>
              </>
            ) : (
              <StyledButtons onClick={toggleAddPopup}>Add</StyledButtons>
            )}
          </SelectedOptions>
        )}

        <Popup isVisible={isAddPopupVisible}>
          <PopupHeader>
            <h2>{title}</h2>
            <ClosePopUpIcon
              className="material-symbols-outlined"
              onClick={toggleAddPopup}
            >
              close
            </ClosePopUpIcon>
          </PopupHeader>
          <PopupBody>
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
              onClick={() => {
                submitUserData();
                toggleAddPopup();
              }}
            >
              Save
            </SaveButton>
          </PopupBody>
        </Popup>
        <PopupOverlay isVisible={isAddPopupVisible} onClick={toggleAddPopup} />
      </PreferencesContent>
    </div>
  );
};

export default PreferenceTile;
