import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const AddNewTimesBtn = styled.button`
  background: #e5ecf6;
  color: black;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  gap: 0.3rem;
  cursor: pointer;
  transition: background 0.5s ease;

  :hover {
    background: #e3f5ff;
  }
`;

export const AddIcon = styled.span`
  color: black;
  font-size: 1.2rem;
`;

export const Form = styled.form`
  width: 25rem;
`;

export const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  display: block;
  padding: 0.6rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  resize: none;
  outline: none;
  :focus {
    border-color: #e3f5ff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const UploadStatus = styled.p`
  color: green;
  text-align: center;
`;

export const Title = styled.p`
  font-size: 1rem;
  color: black;
`;

export const EditIcon = styled.span`
  cursor: pointer;
  color: #1b2e35;
`;

export const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 1fr;
  background-color: #e5ecf6;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.4rem;
`;
export const GridBody = styled(GridHeader)`
  margin-bottom: 1rem;
  padding: 1rem;

  &:nth-of-type(even) {
    background-color: #e5ecf6;
  }

  &:nth-of-type(odd) {
    background-color: #e3f5ff;
  }
`;
