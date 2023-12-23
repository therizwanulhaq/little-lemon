import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { useAuth } from "../context/AuthContext";
import {
  Heading,
  Main,
  NameAndPhoto,
  ProfileContainer,
  ProfileName,
  ProfilePhoto,
  SubHeading,
  UserDetails,
} from "./StyledComponents";
import PreferenceTile from "./Preferences";
import { css } from "@emotion/css";

const toSlug = (text) => {
  if (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  return ""; // Or handle the case when text is undefined
};

const Profile = () => {
  const { logOut, user, userData } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const [selectedDietaryPreference, setSelectedDietaryPreference] =
    useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const currentUser = toSlug(userData?.name) === username;

  const userSignOut = () => {
    logOut()
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
    navigate("/");
  };

  const handleSelectedPreference = (preference) => {
    setSelectedDietaryPreference(preference);
  };
  const handleSelectedAgeGroup = (preference) => {
    setSelectedAgeGroup(preference);
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
              <ProfilePhoto src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" />
              <ProfileName>{userData?.name}</ProfileName>
            </NameAndPhoto>
            <UserDetails>
              <Heading>Your Profile</Heading>
              <SubHeading>
                Your profile preferences help us personalize recommendations for
                you.
              </SubHeading>
              <h3>About you</h3>
              <div
                className={css`
                  margin-top: 0.5rem;
                  border-top: 1px solid grey;
                `}
              >
                <PreferenceTile
                  title=" Dietary Preferences"
                  popupTitle="What are your dietary preferences ?"
                  popupOptions={dietaryPreferences}
                  selectedOptions={selectedDietaryPreference}
                  onSelectedPreferenceChange={handleSelectedPreference}
                />
                <PreferenceTile
                  title="Age Group"
                  popupTitle="What is your age group?"
                  popupOptions={ageGroup}
                  selectedOptions={selectedAgeGroup}
                  onSelectedPreferenceChange={handleSelectedAgeGroup}
                />
              </div>

              <CustomButton onClick={userSignOut}>Sign Out</CustomButton>
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
