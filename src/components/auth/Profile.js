import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { useAuth } from "../context/AuthContext";
import {
  ExpandIcon,
  Heading,
  Main,
  NameAndPhoto,
  Preferences,
  PreferencesContent,
  ProfileContainer,
  ProfileName,
  ProfilePhoto,
  SubHeading,
  UserDetails,
} from "./StyledComponents";

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

  // eslint-disable-next-line no-unused-vars
  const currentUser = toSlug(userData?.name) === username;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const userSignOut = () => {
    logOut()
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
    navigate("/");
  };

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
              <Preferences onClick={handleToggle}>
                Dietary Preferences
                <ExpandIcon
                  className="material-symbols-outlined"
                  expanded={isExpanded}
                >
                  expand_more
                </ExpandIcon>
              </Preferences>
              <PreferencesContent expanded={isExpanded}>
                This content expands and collapses! This content expands and
                collapses! This content expands and collapses! This content
                expands and collapses! This content expands and collapses! This
                content expands and collapses! This content expands and
                collapses! This content expands and collapses! This content
                expands and collapses! This content expands and collapses! This
                content expands and collapses! This content expands and
                collapses! This content expands and collapses!
              </PreferencesContent>
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
