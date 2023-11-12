import styled from "@emotion/styled";

// Create a styled button component using Emotion
const CustomButton = styled.button((props) => ({
  color: props.color,
  background: props.background || "white",
  padding: props.padding,
}));

export default CustomButton;
