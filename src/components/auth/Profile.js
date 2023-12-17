import React from "react";

import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { useAuth } from "../context/AuthContext";
import { Main, ProfilePhoto } from "./StyledComponents";

const Profile = () => {
  const { logOut, user, userData } = useAuth();
  const navigate = useNavigate();

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
          <ProfilePhoto src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" />

          <div>
            <p>{userData.name}</p>
            {/* Display other user data as needed */}
          </div>

          <CustomButton onClick={userSignOut}>Sign Out</CustomButton>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </Main>
  );
};

export default Profile;
