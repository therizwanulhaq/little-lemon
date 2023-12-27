import React, { useRef, useState } from "react";
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
import PreferenceTile from "./Preferences";
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
import { signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import PersonalizedSection from "./PersonalizedSection";

const toSlug = (text) => {
  if (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  return "";
};

const Profile = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const [selectedDietaryPreference, setSelectedDietaryPreference] =
    useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [updateName, setUpdateName] = useState(userData?.name || "");
  const [profilePicture, setProfilePicture] = useState(
    userData?.profilePicture || defaultProfilePicture
  );
  const [loading, setLoading] = useState(false);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const fileInputRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const currentUser = toSlug(userData?.name) === username;

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setImageUploadError(
          "Image size exceeds the maximum allowed size (max 1MB)."
        );
        return;
      }
      setImageUploadError("");
      setLoadingProfilePicture(true);
      const reader = new FileReader();
      const imageRef = ref(storage, `users/profilePictures/${userData?.uid}`);

      await uploadBytes(imageRef, file);

      setProfilePicture(userData?.profilePicture);

      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setLoadingProfilePicture(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (!userDocs.empty) {
        setLoading(true);
        const userDocRef = userDocs.docs[0].ref;

        await updateDoc(userDocRef, {
          name: updateName,
          profilePicture: profilePicture,
        });

        console.log("User data updated successfully!");
        setLoading(false);
        togglePopup();
      } else {
        console.error("User document not found!");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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

  const handleSelectedDietaryPreference = (preference) => {
    setSelectedDietaryPreference(preference);
  };
  const handleSelectedAgeGroup = (preference) => {
    setSelectedAgeGroup(preference);
  };

  const togglePopup = () => {
    setUpdateName(userData.name);
    setProfilePicture(userData.profilePicture || defaultProfilePicture);
    setPopupVisible(!isPopupVisible);
    document.body.style.overflow = isPopupVisible ? "auto" : "hidden";
    setImageUploadError("");
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
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                    <CancelAndContinue>
                      <Cta onClick={togglePopup}>Cancel</Cta>
                      <SaveButton
                        disabled={loading}
                        onClick={updateProfile}
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
                <PreferenceTile
                  title=" Dietary Preferences"
                  popupTitle="What are your dietary preferences ?"
                  popupOptions={dietaryPreferences}
                  selectedOptions={selectedDietaryPreference}
                  onSelectedPreferenceChange={handleSelectedDietaryPreference}
                />
                <PreferenceTile
                  title="Age Group"
                  popupTitle="What is your age group?"
                  popupOptions={ageGroup}
                  selectedOptions={selectedAgeGroup}
                  onSelectedPreferenceChange={handleSelectedAgeGroup}
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
};

export default Profile;
