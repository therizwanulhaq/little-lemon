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
} from "./StyledComponents";
import { CategoriesButton } from "../common/CustomButton";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";

const PreferenceTile = ({
  title,
  popupTitle,
  popupOptions,
  selectedOptions,
  displayedOptions,
  onSelectedPreferenceChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);

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

  const toggleAddPopup = () => {
    setAddPopupVisible(!isAddPopupVisible);
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
    }
  };

  return (
    <div>
      <Preferences onClick={handleToggle}>
        {title} <li>{selectedOptions || displayedOptions}</li>
        <ExpandIcon className="material-symbols-outlined" expanded={isExpanded}>
          expand_more
        </ExpandIcon>
      </Preferences>
      <PreferencesContent expanded={isExpanded}>
        <ul>
          <li>{selectedOptions || displayedOptions}</li>
        </ul>
        {displayedOptions || selectedOptions ? (
          <>
            <StyledButtons onClick={toggleAddPopup}>Edit</StyledButtons>
            <StyledButtons>Delete</StyledButtons>
          </>
        ) : (
          <StyledButtons onClick={toggleAddPopup}>Add</StyledButtons>
        )}

        <Popup isVisible={isAddPopupVisible}>
          <PopupHeader>
            <h2>{popupTitle}</h2>
            <ClosePopUpIcon
              className="material-symbols-outlined"
              onClick={toggleAddPopup}
            >
              close
            </ClosePopUpIcon>
          </PopupHeader>
          <PopupBody>
            <PreferencesContainer>
              {popupOptions.map((preference) => (
                <CategoriesButton
                  key={preference}
                  onClick={() => handlePreferenceClick(preference)}
                  selected={preference === selectedPreference}
                >
                  {preference}
                </CategoriesButton>
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
