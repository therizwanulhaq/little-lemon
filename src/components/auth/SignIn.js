import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ForgotPassword,
} from "./StyledComponents";

import { BackgroundImage } from "../homepage/StyledComponents";

import Lemon from "../../assets/GreenLemon.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Loader, LoaderWrapper } from "../common/StyledComponents";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect after successful sign-in
      navigate("/");
      setLoading(false);
    } catch (error) {
      // Authentication errors
      console.error("Error signing up:", error);
      if (error.code === "auth/invalid-credential") {
        setPasswordError("Incorrect email or password.");
        setLoading(false);
      } else if (error.code === "auth/too-many-requests") {
        setPasswordError(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. "
        );
        setLoading(false);
      } else {
        setPasswordError(error);
      }
      setLoading(false);
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
        <ForgotPassword>
          <Link to="/reset-password">Forgot Password?</Link>
        </ForgotPassword>
        <CustomButton
          disabled={loading}
          margin="1.5rem 0"
          type="submit"
          borderRadius="0.3rem"
          width="100%"
          height="2.7rem"
        >
          {loading ? (
            <LoaderWrapper>
              <Loader
                height="1.4rem"
                width="1.4rem"
                border="3px solid #f0f2f2"
              />
            </LoaderWrapper>
          ) : (
            "Sign In"
          )}
        </CustomButton>
        <SignUpOrSignInMessage>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </SignUpOrSignInMessage>
      </Form>
    </Container>
  );
};

export default SignIn;
