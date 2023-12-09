import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";

const Profile = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
    navigate("/sign-in");
  };
  return (
    <div>
      {authUser ? (
        <>
          <p>Signed In as {authUser.email}</p>
          <CustomButton onClick={userSignOut}>Sign Out</CustomButton>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default Profile;
