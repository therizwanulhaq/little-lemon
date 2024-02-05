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

const ChangeName = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData, updateUserData } = useAuth();
  const [updateName, setUpdateName] = useState();

  const updateUserProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updateFields = {
        name: updateName,
      };

      await updateUserData(updateFields);
      setLoading(false);
      // Redirect with  params
      navigate("/account/manage?type=Name&success=true");
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
      navigate("/account/manage?type=Name&error=true");
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
          <StyledLink to="/account/manage/change-name" end>
            Change Your Name
          </StyledLink>
        </AccountSettingsNavigation>
        <Title>Change Your Name</Title>
        <Container>
          <UerDetailChangeInfo>
            If you want to change the name associated with your Little Lemon
            customer account, you may do so below. Be sure to click the{" "}
            <b>Save Changes</b> button when you are done.
          </UerDetailChangeInfo>
          <form>
            <Label htmlFor="name">New Name</Label>
            <Input
              type="text"
              id="name"
              value={updateName || userData?.name}
              onChange={(e) => setUpdateName(e.target.value)}
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
                "Save Changes"
              )}
            </SaveChanges>
          </form>
        </Container>
      </Section>
    </Main>
  );
};

export default ChangeName;
