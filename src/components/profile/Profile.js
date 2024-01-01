import React, { useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../auth/StyledComponents";
import {
  Main,
  ProfileContainer,
  NameAndPhoto,
  ProfilePhoto,
  ProfileName,
  EditProfileIcon,
  ProfileEditContainer,
  ProfileUploadProgress,
  Cta,
  UploadError,
  EditProfileForm,
  CancelAndContinue,
  SaveButton,
  UserDetails,
  Heading,
  SubHeading,
  LogoutButton,
} from "./StyledComponents";

import { useAuth } from "../context/AuthContext";

import defaultProfilePicture from "../../assets/defaultProfilePicture.jpg";
import Accordion from "./Accordion";
import { Loader, LoaderWrapper } from "../common/StyledComponents";
import { css } from "@emotion/css";
import PopUp from "../common/PopUp";
import { auth, db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import PersonalizedSection from "./PersonalizedSection";
import { toSlug } from "../common/Utils";

const initialState = {
  isPopupVisible: false,
  updateName: "",
  profilePicture: "",
  loadingProfilePicture: false,
  imageUploadError: "",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_POPUP":
      return { ...state, isPopupVisible: !state.isPopupVisible };
    case "SET_UPDATE_NAME":
      return { ...state, updateName: action.payload };
    case "SET_PROFILE_PICTURE":
      return { ...state, profilePicture: action.payload };
    case "SET_LOADING_PROFILE_PICTURE":
      return { ...state, loadingProfilePicture: action.payload };
    case "SET_IMAGE_UPLOAD_ERROR":
      return { ...state, imageUploadError: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const Profile = React.memo(() => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isPopupVisible,
    updateName,
    loadingProfilePicture,
    profilePicture,
    imageUploadError,
    loading,
  } = state;

  // eslint-disable-next-line no-unused-vars
  const currentUser = toSlug(userData?.name) === username;

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const togglePopup = () => {
    dispatch({ type: "TOGGLE_POPUP" });
    dispatch({ type: "SET_UPDATE_NAME", payload: userData.name });
    dispatch({
      type: "SET_PROFILE_PICTURE",
      payload: userData.profilePicture || defaultProfilePicture,
    });
    dispatch({ type: "SET_IMAGE_UPLOAD_ERROR", payload: "" });

    document.body.style.overflow = isPopupVisible ? "auto" : "hidden";
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        dispatch({
          type: "SET_IMAGE_UPLOAD_ERROR",
          payload: "Image size exceeds the maximum allowed size (max 1MB).",
        });
        return;
      }
      dispatch({ type: "SET_IMAGE_UPLOAD_ERROR", payload: "" });
      dispatch({ type: "SET_LOADING_PROFILE_PICTURE", payload: true });

      const reader = new FileReader();

      try {
        const imageRef = ref(storage, `users/profilePictures/${userData?.uid}`);
        await uploadBytes(imageRef, file);

        reader.onloadend = () =>
          dispatch({ type: "SET_PROFILE_PICTURE", payload: reader.result });
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        dispatch({
          type: "SET_IMAGE_UPLOAD_ERROR",
          payload: "Error uploading image. Please try again.",
        });
      } finally {
        dispatch({ type: "SET_LOADING_PROFILE_PICTURE", payload: false });
      }
    }
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (!userDocs.empty) {
        dispatch({ type: "SET_LOADING", payload: true });

        const userDocRef = userDocs.docs[0].ref;

        await updateDoc(userDocRef, {
          name: updateName,
          profilePicture: profilePicture,
        });

        const currentUser = auth.currentUser;

        // Update the user's display name
        await updateProfile(currentUser, {
          displayName: updateName,
        });

        console.log("User data updated successfully!");
        dispatch({ type: "SET_LOADING", payload: false });

        togglePopup();
      } else {
        console.error("User document not found!");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
    navigate("/");
  };

  // Sample dietary preferences data
  const dietaryPreferences = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
  ];
  // Sample age group data
  const ageGroup = [
    "18-20",
    "21-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50 and above",
  ];

  return (
    <Main>
      {user ? (
        <>
          <ProfileContainer>
            <NameAndPhoto>
              <ProfilePhoto
                src={userData?.profilePicture || defaultProfilePicture}
              />
              <ProfileName>
                {userData?.name}
                <EditProfileIcon
                  className="material-symbols-outlined"
                  onClick={togglePopup}
                >
                  edit
                </EditProfileIcon>
              </ProfileName>
              <PopUp
                title="Edit profile"
                togglePopup={togglePopup}
                isVisible={isPopupVisible}
              >
                <ProfileEditContainer>
                  <div style={{ position: "relative" }}>
                    {loadingProfilePicture ? (
                      <ProfileUploadProgress>
                        <Loader />
                      </ProfileUploadProgress>
                    ) : (
                      <ProfilePhoto src={profilePicture} />
                    )}
                  </div>
                  <Cta onClick={openFileInput}>Change profile photo</Cta>
                  <UploadError isVisible={imageUploadError}>
                    {imageUploadError}
                  </UploadError>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicture}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  <EditProfileForm>
                    <Input
                      type="text"
                      value={updateName}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_UPDATE_NAME",
                          payload: e.target.value,
                        })
                      }
                    />
                    <CancelAndContinue>
                      <Cta onClick={togglePopup}>Cancel</Cta>
                      <SaveButton
                        disabled={loading}
                        onClick={updateUserProfile}
                        width="6rem"
                        padding="0.4rem 1rem"
                      >
                        {loading ? (
                          <LoaderWrapper>
                            <Loader
                              width="1rem"
                              height="1rem"
                              border="2px solid #f0f2f2"
                            />
                          </LoaderWrapper>
                        ) : (
                          "Continue"
                        )}
                      </SaveButton>
                    </CancelAndContinue>
                  </EditProfileForm>
                </ProfileEditContainer>
              </PopUp>
            </NameAndPhoto>
            <UserDetails>
              <Heading>Your Profile</Heading>

              <SubHeading>
                Your profile preferences help us personalize recommendations for
                you.
              </SubHeading>
              <PersonalizedSection />
              <h4>About you</h4>
              <div
                className={css`
                  margin-top: 0.5rem;
                  border-top: 1px solid #d5d9d9;
                `}
              >
                <Accordion
                  title=" Dietary Preferences"
                  popupTitle="What are your dietary preferences ?"
                  popupOptions={dietaryPreferences}
                />
                <Accordion
                  title="Age Group"
                  popupTitle="What is your age group?"
                  popupOptions={ageGroup}
                />
              </div>

              <LogoutButton onClick={userSignOut}>Sign Out</LogoutButton>
            </UserDetails>
          </ProfileContainer>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </Main>
  );
});

export default Profile;
