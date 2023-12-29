import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { CustomButton } from "../common/CustomButton";
import { BackgroundImage } from "../homepage/StyledComponents";
import Lemon from "../../assets/GreenLemon.png";
import {
  Container,
  Form,
  Title,
  Label,
  Input,
  ErrorMessage,
  SignUpOrSignInMessage,
} from "./StyledComponents";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Loader, LoaderWrapper } from "../common/StyledComponents";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    //Validate name
    if (name === "") {
      setNameError("Name cannot be empty");
      return;
    }

    // Validate email
    if (email === "") {
      setEmailError("Please enter an email!");
      return;
    }

    //Validate password
    if (password === "") {
      setPasswordError("Please enter your password!");
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Password and Confirm Password should be the same"
      );
      return;
    }
    setLoading(true);
    // Continue with the sign-up process
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Redirect after successful sign-up
      navigate("/");

      // Fetch the current user after signing up
      const currentUser = auth.currentUser;

      // Get the current user UID
      const userUID = currentUser.uid;

      // Add user data to FireStore
      const userDocRef = doc(db, "users", userUID);
      await setDoc(userDocRef, {
        uid: userUID,
        name: name,
        email: email,
      });
    } catch (error) {
      // Authentication errors
      console.error("Error signing up:", error);
      if (error.code === "auth/email-already-in-use") {
        setEmailError(
          "This email is already registered. Please use another email."
        );
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
      <Form onSubmit={handleSignUp}>
        <Title>Create a new account!</Title>

        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="First and last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ErrorMessage>{nameError}</ErrorMessage>

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
          placeholder="Enter your password (At least 6 characters)"
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
            "Sign Up"
          )}
        </CustomButton>
        <SignUpOrSignInMessage>
          Already have an account? <Link to="/sign-in">Log In</Link>
        </SignUpOrSignInMessage>
      </Form>
    </Container>
  );
};

export default SignUp;
