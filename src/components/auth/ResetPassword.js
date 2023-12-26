import React, { useState } from "react";
import { Container, Input, Label, Title } from "./StyledComponents";
import { CustomButton } from "../common/CustomButton";
import styled from "@emotion/styled";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const PasswordResetInfo = styled.p`
  width: 20rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
`;

const ResetStatus = styled.p`
  color: ${(props) => props.color || "red"};
  text-align: center;
  font-size: 1rem;
`;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setResetStatus("");
      await sendPasswordResetEmail(auth, email);
      setResetStatus("success");
    } catch (error) {
      console.log(error);
      setResetStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handlePasswordReset}>
        <PasswordResetContainer>
          <Title>Reset your password</Title>
          <PasswordResetInfo>
            Please enter the email address you use to sign into Little Lemon
          </PasswordResetInfo>
          <Label htmlFor="email">Enter your email address:</Label>
          <Input
            id="email"
            required
            type="email"
            autoComplete="on"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomButton type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send password reset link"}
          </CustomButton>

          {resetStatus === "success" && (
            <ResetStatus color="green">
              Check your email for further instructions
            </ResetStatus>
          )}
          {resetStatus === "error" && (
            <ResetStatus>
              An error occurred. Please try again later.
            </ResetStatus>
          )}
        </PasswordResetContainer>
      </form>
    </Container>
  );
};

export default ResetPassword;
