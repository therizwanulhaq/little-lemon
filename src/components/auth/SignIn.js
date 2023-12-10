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
  PasswordContainer,
  EyeIcon,
  ErrorMessage,
  SignUpOrSignInMessage,
} from "./StyledComponents";

import { BackgroundImage } from "../homepage/StyledComponents";

import Lemon from "../../assets/GreenLemon.png";

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (email === "") {
      setEmailError("Please enter an email!");
      return;
    }

    // Validate password
    if (password === "") {
      setPasswordError("Please enter your password!");
      return;
    }

    // Continue with the sign-in process
    try {
      await signIn(email, password);
      // Redirect after successful sign-in
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
      <Form onSubmit={handleSignIn}>
        <Title>Log In</Title>
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
        <PasswordContainer>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeIcon
            className="material-symbols-outlined"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </EyeIcon>
        </PasswordContainer>
        <ErrorMessage>{passwordError}</ErrorMessage>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CustomButton
          margin="1.5rem 0"
          type="submit"
          borderRadius="0.3rem"
          width="100%"
          height="2.5rem"
        >
          Log In
        </CustomButton>
        <SignUpOrSignInMessage>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </SignUpOrSignInMessage>
      </Form>
    </Container>
  );
};

export default SignIn;
