import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SignUp = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate email
    if (email === "") {
      setEmailError("Please enter an email!");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter your password!");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Password and Confirm Password should be the same"
      );
      return;
    }

    // Continue with the sign-up process
    try {
      await signUp(email, password);
      // Redirect after successful sign-up
      navigate("/profile");
    } catch (error) {
      // Authentication errors
      console.error("Error signing up:", error);
      setErrorMessage(error.message);
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
      <Form onSubmit={SignUp}>
        <Title>Sign Up</Title>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ErrorMessage>{emailError}</ErrorMessage>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage>{passwordError}</ErrorMessage>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ErrorMessage>{confirmPasswordError}</ErrorMessage>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CustomButton
          margin="1.5rem 0"
          type="submit"
          borderRadius="0.3rem"
          width="100%"
          height="2.5rem"
        >
          Sign Up
        </CustomButton>
        <SignUpOrSignInMessage>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </SignUpOrSignInMessage>
      </Form>
    </Container>
  );
};

export default SignUp;
