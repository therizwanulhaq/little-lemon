import React, { useState } from "react";
import styled from "@emotion/styled";
import { CustomButton } from "../common/CustomButton";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

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

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/profile");
  };

  return (
    <Container>
      <Form onSubmit={signIn}>
        <Title>Log In</Title>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
