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
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [updateUserPassword, setUpdateUserPassword] = useState("");

  const updateUserProfile = async (e) => {
    e.preventDefault();

    try {
      await updatePassword(auth.currentUser, updateUserPassword);
      setLoading(false);
      // Redirect with  params
      navigate("/account/manage?type=Password&success=true");
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
      navigate("/account/manage?type=Password&error=true");
    }
  };

  return (
    <Main>
      <Section>
        <AccountSettingsNavigation>
          <StyledLink to={`/user/${toSlug(userData?.name)}`}>
            Your Account{" > "}
          </StyledLink>
          <StyledLink to="/account/manage" end>
            Login & Security {" > "}
          </StyledLink>
          <StyledLink to="/account/manage/change-password" end>
            Change Your Password
          </StyledLink>
        </AccountSettingsNavigation>
        <Title>Change Your Password</Title>
        <Container>
          <UerDetailChangeInfo>
            If you want to change the password associated with your Little Lemon
            customer account, you may do so below. Be sure to click the{" "}
            <b>Save Changes</b> button when you are done.
          </UerDetailChangeInfo>
          <form>
            <Label htmlFor="name">New Password</Label>
            <Input
              type="password"
              id="name"
              value={updateUserPassword}
              onChange={(e) => setUpdateUserPassword(e.target.value)}
            />
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
                "Save Changes"
              )}
            </SaveChanges>
          </form>
        </Container>
      </Section>
    </Main>
  );
};

export default ChangePassword;
