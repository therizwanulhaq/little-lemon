import React, { useState } from "react";
import { toSlug } from "../common/Utils";
import { useAuth } from "../context/AuthContext";
import {
  AccountSettingsNavigation,
  Container,
  Main,
  Section,
  StyledButtons,
  StyledLink,
  Title,
} from "./StyledComponents";
import styled from "@emotion/styled";
import PasswordConfirmation from "./PasswordConfirmation";

const DataList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DataTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f1111;
  margin-bottom: 0.5rem;
`;

const DataValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #0f1111;
`;

const EditButton = styled(StyledButtons)`
  width: 6rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
`;

const UserDataUpdateInfo = styled.div`
  margin-top: 1rem;
  color: #0f1111;
  padding: 0.7rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  border: 2px solid ${(props) => (props.success ? "#067d62" : "#ffaf38")};
  border-left: 0.7rem solid
    ${(props) => (props.success ? "#067d62" : "#ffaf38")};
  border-radius: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.3rem;
  color: ${(props) => (props.success ? "#067d62" : "#ffaf38")};
`;

const LoginAndSecurity = () => {
  const { userData } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const togglePopup = (title) => {
    setSelectedItem(title);
    setIsPopupVisible(!isPopupVisible);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success") === "true";
  const error = urlParams.get("error") === "true";
  const changeType = urlParams.get("type");

  // Fallback values for cases where URL parameters are not present or have unexpected values
  const defaultChangeType = "Change";
  const defaultSuccessMessage = "Updated";
  const defaultErrorMessage = "Error updating";

  // Display success message with fallback values
  let message = null;
  if (success) {
    message = `${changeType || defaultChangeType} ${defaultSuccessMessage}`;
  } else if (error) {
    message = `${defaultErrorMessage} ${changeType || defaultChangeType}`;
  }

  const UserDetails = [
    {
      title: "Name",
      value: userData?.name,
      // path: "/account/manage/change-name",
    },
    {
      title: "Email",
      value: userData?.email,
      // path: "/account/manage/change-email",
    },
    {
      title: "Password",
      value: userData?.password,
      // path: "/account/manage/change-password",
    },
  ];

  return (
    <Main>
      <Section>
        <AccountSettingsNavigation>
          <StyledLink to={`/user/${toSlug(userData?.name)}`}>
            Your account{" > "}
          </StyledLink>
          <StyledLink to="/account/manage">Login and Security</StyledLink>
        </AccountSettingsNavigation>
        {(success || error) && (
          <UserDataUpdateInfo success={success}>
            <Icon success={success} className="material-symbols-outlined">
              {success ? "check_circle" : "warning"}
            </Icon>
            {message}
          </UserDataUpdateInfo>
        )}
        <Title>Login and Security</Title>
        <Container>
          {UserDetails.map((data, index) => (
            <React.Fragment key={index}>
              <DataList>
                <div>
                  <DataTitle>{data.title}</DataTitle>
                  <DataValue>
                    {data.title === "Password" ? "*********" : data.value}
                  </DataValue>
                </div>

                <EditButton onClick={() => togglePopup(data.title)}>
                  Edit
                </EditButton>
              </DataList>
              {index < UserDetails.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Container>
        <PasswordConfirmation
          togglePopup={() => togglePopup(null)}
          isVisible={isPopupVisible}
          selectedItem={selectedItem}
        />
      </Section>
    </Main>
  );
};

export default LoginAndSecurity;
