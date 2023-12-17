import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Query the "users" collection to find the document with the matching email
        const usersCollection = collection(db, "users");
        const userQuery = query(
          usersCollection,
          where("email", "==", user.email)
        );
        const userDocs = await getDocs(userQuery);

        if (userDocs.size > 0) {
          // Assume the first document (if multiple found) corresponds to the user
          const userDoc = userDocs.docs[0];
          setUserData(userDoc.data());
        } else {
          console.log("User data not found in Firestore");
        }
      }
    };

    fetchUserData();
  }, [user]);
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
          {userData && (
            <div>
              <p>User Data:</p>
              <p>Name: {userData.name}</p>
              {/* Display other user data as needed */}
            </div>
          )}
          <CustomButton onClick={userSignOut}>Sign Out</CustomButton>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default Profile;
