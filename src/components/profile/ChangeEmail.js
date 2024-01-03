import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  AccountSettingsNavigation,
  Container,
  Input,
  Label,
  Main,
  SaveChanges,
  Section,
  StyledLink,
  Title,
  UerDetailChangeInfo,
} from "./StyledComponents";
import { toSlug } from "../common/Utils";

import { Loader, LoaderWrapper } from "../common/StyledComponents";
import { useNavigate } from "react-router-dom";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData, updateUserData } = useAuth();
  const [updateUserEmail, setUpdateUserEmail] = useState("");

  const updateUserProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updateFields = {
        email: updateUserEmail,
      };

      await updateEmail(auth.currentUser, updateUserEmail);
      await updateUserData(updateFields);
      setLoading(false);
      // Redirect with  params
      navigate("/account/manage?type=Email&success=true");
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
      navigate("/account/manage?type=Email&error=true");
    }
  };

  return (
    <Main>
      <Section>
        <AccountSettingsNavigation>
          <StyledLink to={`/profile/${toSlug(userData?.name)}`}>
            Your Account{" > "}
          </StyledLink>
          <StyledLink to="/account/manage" end>
            Login & Security {" > "}
          </StyledLink>
          <StyledLink to="/account/manage/change-email" end>
            Change Your Email
          </StyledLink>
        </AccountSettingsNavigation>
        <Title>Change your email address</Title>
        <Container>
          <UerDetailChangeInfo>
            Current email address: {userData?.email} <br></br>
            Enter the new email address you would like to associate with your
            account below. We will send a One Time Password (OTP) to that
            address.
          </UerDetailChangeInfo>
          <form>
            <Label htmlFor="name">New Email</Label>
            <Input
              type="email"
              id="name"
              value={updateUserEmail}
              onChange={(e) => setUpdateUserEmail(e.target.value)}
            ></Input>
            <SaveChanges
              disabled={loading}
              type="submit"
              onClick={updateUserProfile}
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
                "Continue"
              )}
            </SaveChanges>
          </form>
        </Container>
      </Section>
    </Main>
  );
};

export default ChangeEmail;
