import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

// Styles for Profile

export const Main = styled.main`
  padding: 2rem 15rem;
  min-height: 100vh;
  ${mq[3]} {
    padding: 2rem 10rem;
  }
  ${mq[2]} {
    padding: 2rem 5rem;
  }

  ${mq[1]} {
    padding: 1rem 2rem;
  }

  ${mq[0]} {
    padding: 1rem 1rem;
  }
`;

export const ProfileContainer = styled.section`
  display: flex;
  gap: 7rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin-top: 1rem;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const NameAndPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const ProfilePhoto = styled.img`
  width: 5rem;
  height: 5rem;
  border: 2px solid #d5d9d9;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileName = styled.p`
  position: relative;
  font-size: 1.3rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`;

export const EditProfileIcon = styled.span`
  position: absolute;
  right: -2rem;
  cursor: pointer;
  font-size: 1.1rem;
`;

export const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0.5rem;
  height: fit-content;
  height: 100%;
  overflow-y: auto;
`;

// export const ProfileUploadProgress = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export const Cta = styled.p`
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.color || "#007185"};
`;

export const UploadError = styled.p`
  display: none;
  color: red;
  width: 20rem;
  font-size: 0.9rem;
  text-align: center;
  ${({ isVisible }) =>
    isVisible &&
    `
      display:block;
    `};
`;

export const EditProfileForm = styled.form`
  border-top: 1px solid rgb(219 219 219);
  padding-top: 1.5rem;
`;

export const CancelAndContinue = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SaveButton = styled.button`
  cursor: pointer;
  color: ${(props) => (props.disabled ? "#3333337a" : "#333333")};
  background: ${(props) => (props.disabled ? "#FFFAE0" : "#f4ce14")};
  border: 1px solid ${(props) => (props.disabled ? "#FFED94" : "#FFFAE0")};
  width: ${(props) => props.width || ""};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: block;
  margin-left: auto;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: ${(props) => props.padding || " 0.4rem 1.8rem"};

  :hover {
    background: ${(props) => (props.disabled ? "" : "#e1bb00")};
  }
`;

export const UserDetails = styled.div`
  width: 100%;
`;

export const Heading = styled.h1`
  font-size: 1.6rem;
`;

export const SubHeading = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  color: #333333;
  background: #f4ce14;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.6rem 1.5rem;
  margin-top: 2rem;
  display: block;
  margin-left: auto;

  ${mq[1]} {
    width: 100%;
  }
`;

// Styles for Preferences

export const Preferences = styled.h4`
  position: relative;
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DisplayedOptions = styled.p`
  position: absolute;
  font-size: 0.9rem;
  font-weight: 400;
  color: #b8b8b8;
  text-align: center;
  left: 50%;
  ${({ expanded }) =>
    expanded &&
    `
      display:none;
    `};
  @media (max-width: 768px) {
    left: 65%;
  }
`;

export const ExpandIcon = styled.span`
  font-size: 2rem;
  transition: rotate 0.2s ease-in;
  ${({ expanded }) =>
    expanded &&
    `
    rotate: 180deg;
    `};
`;

export const PreferencesContent = styled.div`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease-in-out;
  border-bottom: 1px solid #d5d9d9;

  ${({ expanded }) =>
    expanded &&
    `
      max-height: 500px; // Adjust the max height based on your content
    `};
`;

export const LoaderContainer = styled.div`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteConfirmation = styled.div`
  padding: 1rem 0;
  display: none;
  place-items: center;
  text-align: center;
  ${({ displayed }) =>
    displayed &&
    `
      display:grid;
    `};
`;

export const StyledButtons = styled.button`
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.3rem 1rem;
  margin-right: 1rem;
  border: 1px solid #d5d9d9;
  border-radius: 0.5rem;
  background: white;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5);
`;

export const SelectedOptions = styled.div`
  padding: 1rem 0;
`;

export const PreferencesContainer = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 100%;
  padding-bottom: 2rem;

  ${mq[1]} {
    padding-bottom: 3rem;
  }
`;

export const Options = styled.button((props) => ({
  color: "black",
  fontWeight: props.selected ? "700" : "500",
  background: props.selected ? "#EDFDFF" : "white",
  border: props.selected ? "1px solid #007185" : "1px solid grey",
  borderRadius: "0.4rem",
  fontSize: "0.8rem",
  padding: "0.4rem",
  cursor: "pointer",

  [mq[0]]: {
    height: "3rem",
  },
}));

//Login & Security

export const Section = styled.section`
  min-width: 300px;
  max-width: 600px;
  margin: auto;
`;

export const Title = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 1rem;

  ${mq[1]} {
    font-size: 1.5rem;
  }
`;

export const Container = styled.div`
  outline: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

export const AccountSettingsNavigation = styled.p`
  font-size: 0.9rem;
  font-weight: 500;

  ${mq[1]} {
    display: none;
  }
`;

const linkStyles = `
  color: #007185;
  text-decoration: none;

   &.active {
    color: #c66218;
  }
  `;

export const StyledLink = styled(NavLink)`
  ${linkStyles}
`;

export const UerDetailChangeInfo = styled.p`
  color: #111;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.3rem;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 15rem;
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  outline: none;
  appearance: textfield;
  display: block;

  &:focus {
    border-color: #f4ce14;
  }

  ${mq[1]} {
    width: 100%;
  }
`;

export const SaveChanges = styled(CustomButton)`
  width: 9rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  ${mq[1]} {
    width: 100%;
  }
`;
