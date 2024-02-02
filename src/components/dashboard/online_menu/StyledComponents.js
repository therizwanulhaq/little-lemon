import styled from "@emotion/styled";
import { CustomButton } from "../../common/CustomButton";

//DishList Page

export const SearchboxAndButton = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1.5fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SearchBox = styled.input`
  width: 35rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: 1px solid #e3f5ff;
`;

export const AddNewDishButton = styled.button`
  background: #e5ecf6;
  color: black;
  height: 100%;
  width: 100%;
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

export const Title = styled.p`
  font-size: 1rem;
  color: black;
`;

export const DishImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.2rem;
  object-fit: cover;
`;

export const DishName = styled.p`
  font-weight: 500;
`;

export const DishDescription = styled.p`
  font-size: 0.9rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const DishPrice = styled.p`
  font-weight: 500;
  color: #f48c06;
`;

export const DishCategory = styled.p`
  font-weight: 500;
`;

export const DishModifiers = styled.p`
  color: #841111;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const EditIcon = styled.span`
  color: #1b2e35;
`;

export const GridHeader = styled.div`
  display: grid;
  background-color: #e5ecf6;
  align-items: center;
  grid-template-columns: 1fr 2fr 3fr 1fr 1fr 3fr 1fr;
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

//Add new dish

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
`;

export const UploadFileIcon = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-size: 3rem;
  color: #ccc;
  z-index: -1;
`;

export const UploadFileText = styled.p`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  color: #ccc;
  z-index: -1;
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

export const Textarea = Input.withComponent("textarea");

export const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  outline: none;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  margin: ${(props) => props.margin || "0 0 1rem 0"};

  appearance: none;
  background-image: url("https://fonts.gstatic.com/s/i/materialiconsoutlined/keyboard_arrow_down/v6/24px.svg"); /* Google Icons arrow-down */
  background-repeat: no-repeat;
  background-position: calc(100% - 0.5rem) center; /* Adjust the value as needed */
`;

export const Option = styled.option`
  padding: 0.6rem;
  font-size: 1rem;
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background: #fefbec; */
  border: 1px solid #ccc;
  padding: 0.6rem 1rem;
  height: 4rem;
  border-radius: 0.5rem;
  margin: 1.7rem 0 1rem 0;
`;

export const ModifierHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 2.3fr 0.5fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ModifierBody = styled(ModifierHeader)`
  margin-bottom: 0;
`;

export const DeleteIcon = styled.button`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 1rem;

  :hover {
    background: red;
    color: #fff;
  }
`;

export const StyledButton = styled(CustomButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  :hover {
    background: ${(props) => (props.disabled ? "#d5f8e5" : "#d5f8e5")};
    color: black;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #1b2e35;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DishStatus = styled.p`
  color: ${(props) => props.color || "green"};
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
`;

export const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 3rem;
    color: red;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 1rem;
  }
`;

export const PopupActions = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
