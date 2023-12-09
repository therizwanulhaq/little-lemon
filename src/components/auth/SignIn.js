import React, { useState } from "react";
import styled from "@emotion/styled";
import { CustomButton } from "../common/CustomButton";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const focusColor = "#f4ce14";

const Container = styled.div`
  padding-top: 5rem;
  height: 90vh;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 400px;
  border: none;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.7rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  outline: none;
  appearance: textfield;

  &:focus {
    border-color: ${focusColor};
  }
`;

const Error = styled.p`
  margin-top: 0.3rem;
  color: red;
  font-size: 0.8rem;
`;

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

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
      // Redirect to profile or any other page after successful sign-in
      navigate("/profile");
    } catch (error) {
      // Handle authentication errors
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <Title>Log In</Title>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Error>{emailError}</Error>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error>{passwordError}</Error>
        <Error>{error}</Error>
        <CustomButton
          margin="1.5rem 0"
          type="submit"
          borderRadius="0.3rem"
          width="100%"
          height="2.5rem"
        >
          Log In
        </CustomButton>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignIn;
