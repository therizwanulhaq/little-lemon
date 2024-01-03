import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import {
  Container,
  Form,
  Title,
  Label,
  Input,
  ErrorMessage,
  SignUpOrSignInMessage,
} from "./StyledComponents";

import { BackgroundImage } from "../homepage/StyledComponents";
import Lemon from "../../assets/GreenLemon.png";
import { auth } from "../../firebase";
import { Loader, LoaderWrapper } from "../common/StyledComponents";
import { confirmPasswordReset } from "firebase/auth";

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(window.location.search);
  const actionCode = searchParams.get("oobCode");

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, actionCode, newPassword);
      setIsPasswordReset(true);
    } catch (error) {
      console.error(error.message);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundImage
        imageUrl={Lemon}
        top="0"
        left="14rem"
        width="5rem"
        background="#fdfdfdf0;"
      />
      <BackgroundImage
        imageUrl={Lemon}
        top="15rem"
        right="14rem"
        width="8rem"
      />
      <Form onSubmit={handleConfirmReset}>
        <Title>Set new password</Title>
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <ErrorMessage>{error}</ErrorMessage>

        <CustomButton
          disabled={isLoading}
          margin="1.5rem 0"
          type="submit"
          borderRadius="0.3rem"
          width="100%"
          height="2.7rem"
        >
          {isLoading ? (
            <LoaderWrapper>
              <Loader
                height="1.4rem"
                width="1.4rem"
                border="3px solid #f0f2f2"
              />
            </LoaderWrapper>
          ) : (
            "Reset Password"
          )}
        </CustomButton>
        {isPasswordReset && (
          <div>
            <p
              style={{ textAlign: "center", margin: "1rem 0", color: "green" }}
            >
              Password reset successful
            </p>
            <SignUpOrSignInMessage>
              <Link to="/sign-in">Login to continue!</Link>
            </SignUpOrSignInMessage>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default SetNewPassword;
