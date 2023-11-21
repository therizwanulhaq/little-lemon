import styled from "@emotion/styled";

const CustomButton = styled.button((props) => ({
  width: props.width || "auto",
  color: props.color || "#333333",
  background: props.background || "#F4CE14",
  padding: props.padding || "0.7rem 2rem",
  border: "none",
  borderRadius: props.borderRadius || "1rem",
  fontWeight: "700",
  fontSize: "1rem",
  margin: "1rem 0",
  transition: "background 0.3s ease",
  cursor: props.disabled ? "not-allowed" : "pointer", // Adjust cursor based on disabled state
  opacity: props.disabled ? 0.5 : 1, // Adjust opacity based on disabled state

  "&:hover": {
    background: "#D3AC0E",
  },
}));

export default CustomButton;
