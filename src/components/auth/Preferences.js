import React, { useEffect, useState } from "react";
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
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import { css } from "@emotion/css";
import Loader from "./Loader";

const PreferenceTile = ({
  title,
  popupTitle,
  popupOptions,
  onSelectedPreferenceChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [realtimeValue, setRealtimeValue] = useState("");

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

  // Update user data in Firestore
  const updateUserData = async (fieldName, fieldValue, operation) => {
    try {
      setIsLoading(true); // Set loading to true when the operation starts

      const usersCollection = collection(db, "users");

      // Find the user document by UID
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (userDocs.size > 0) {
        const userDoc = userDocs.docs[0];

        // Perform the specified operation (update or delete)
        const updateData =
          operation === "update"
            ? { [fieldName]: fieldValue }
            : { [fieldName]: deleteField() };

        // Update or delete the user document based on the operation
        await updateDoc(userDoc.ref, updateData);

        console.log(
          `User data ${
            operation === "update" ? "updated" : "field deleted"
          } successfully`
        );
      } else {
        console.log("User data not found in Firestore");
      }
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

  useEffect(() => {
    // Subscribe to real-time updates when the component mounts
    const usersCollection = collection(db, "users");

    const unsubscribe = onSnapshot(
      query(usersCollection, where("uid", "==", user.uid)),
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setRealtimeValue(data[fieldName] || "");
        }
      },
      (error) => {
        console.error("Error getting real-time data: ", error.message);
      }
    );

    // Unsubscribe from real-time updates when the component unmounts
    return () => unsubscribe();
  });

  return (
    <div>
      <Preferences onClick={handleToggle}>
        {title}
        <DisplayedOptions expanded={isExpanded}>
          {realtimeValue ? realtimeValue : "--"}
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
            <p>{realtimeValue ? realtimeValue : "--"}</p>

            {realtimeValue ? (
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
