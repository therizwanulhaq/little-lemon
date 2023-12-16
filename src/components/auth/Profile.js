import React from "react";

import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { logOut, user } = useAuth();
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
    <div>
      {user ? (
        <>
          <p>Signed In as {user.email}</p>
          <CustomButton onClick={userSignOut}>Sign Out</CustomButton>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default Profile;
