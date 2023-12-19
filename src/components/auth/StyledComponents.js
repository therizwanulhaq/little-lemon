import styled from "@emotion/styled";

const focusColor = "#f4ce14";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

//Login and Signup styles

export const Container = styled.main`
  position: relative;
  height: 90vh;
  background: #fdfdfdf0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  max-width: 400px;
  border: none;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.7rem;
  margin-top: 1rem;
`;

export const Input = styled.input`
  width: 20rem;
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

export const PasswordContainer = styled.div`
  position: relative;
`;

export const EyeIcon = styled.span`
  position: absolute;
  color: #bebebe;
  font-weight: lighter;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  width: 20rem;
  margin-top: 0.3rem;
  color: red;
  font-size: 0.8rem;
`;

export const SignUpOrSignInMessage = styled.p`
  text-align: center;
`;

//Profile Styles

export const Main = styled.main`
  padding: 2rem 15rem;
  /* background: #f7f7f7; */

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
  gap: 5rem;
`;

export const NameAndPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ProfilePhoto = styled.img`
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileName = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

export const UserDetails = styled.div``;

export const Heading = styled.h1`
  font-size: 2.3rem;
`;

export const SubHeading = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

export const Preferences = styled.h4`
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 5rem;
`;

export const ExpandIcon = styled.span`
  font-size: 2rem;
  transition: rotate 0.4s ease-in;
  ${({ expanded }) =>
    expanded &&
    `
    rotate: 180deg;
    `};
`;

export const PreferencesContent = styled.div`
  overflow: hidden;
  opacity: 0;
  max-height: 0;
  transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;

  ${({ expanded }) =>
    expanded &&
    `
      opacity: 1;
      max-height: 500px; // Adjust the max height based on your content
    `};
`;
