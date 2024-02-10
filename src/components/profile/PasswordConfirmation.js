import React, { useState } from "react";
import PopUp from "../common/PopUp";
import { useAuth } from "../context/AuthContext";
import styled from "@emotion/styled";
import { CustomButton } from "../common/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Loader } from "../common/StyledComponents";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const Form = styled.form`
  width: 17rem;
  ${mq[1]} {
    width: 100%;
  }
`;

const Input = styled.input`
  margin: 1rem 0;
  width: 100%;
  padding: 0.5rem;
  display: block;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
  width: 100%;
  color: red;
`;

const PasswordConfirmation = ({ togglePopup, isVisible, selectedItem }) => {
  const { userData } = useAuth();

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTogglePopup = () => {
    setErrorMessage("");
    setPassword("");
    togglePopup();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, userData?.email, password);
      console.log("Sign in successfull");

      // Redirect to the selected item path
      const selectedItemPath = `/account/manage/change-${selectedItem}`;
      window.location.href = selectedItemPath;
      setLoading(false);
    } catch (error) {
      console.error("Error signing in", error);
      setErrorMessage("ERROR! Check your password and try again.");
      setLoading(false);
    }
  };

  return (
    <PopUp
      isVisible={isVisible}
      togglePopup={handleTogglePopup}
      title="Password Confirmation"
    >
      <Form onSubmit={handleFormSubmit}>
        <h5>Enter your password to continue!</h5>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CustomButton width="100%" type="submit" disabled={loading}>
          {loading ? (
            <Loader width="1rem" height="1rem" border="3px solid black" />
          ) : (
            "Confirm"
          )}
        </CustomButton>
      </Form>
    </PopUp>
  );
};

export default PasswordConfirmation;
