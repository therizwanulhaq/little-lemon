import styled from "@emotion/styled";

const focusColor = "#f4ce14";

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
  text-align: justify;
  width: 20rem;
  margin-top: 0.3rem;
  color: red;
  font-size: 0.8rem;
`;

export const ForgotPassword = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: right;
  color: #007185;
`;

export const SignUpOrSignInMessage = styled.p`
  text-align: center;
`;
