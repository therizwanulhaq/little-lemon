import styled from "@emotion/styled";

const CustomButton = styled.button((props) => ({
  color: props.color || "#333333",
  background: props.background || "#F4CE14",
  padding: props.padding || "0.7rem 2rem",
  border: "none",
  borderRadius: "1rem",
  fontWeight: "700",
  fontSize: "1rem",
  margin: "1rem 0",
  cursor: "pointer",
}));

export default CustomButton;
