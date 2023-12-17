import styled from "@emotion/styled";

export const CustomButton = styled.button((props) => ({
  width: props.width || "auto",
  height: props.height || "auto",
  color: props.color || "#333333",
  background: props.background || "#F4CE14",
  padding: props.padding || "0.7rem 2rem",
  border: "none",
  borderRadius: props.borderRadius || "1rem",
  fontWeight: "700",
  fontSize: props.fontSize || "1rem",
  margin: props.margin || "1rem 0",
  transition: "background 0.3s ease",
  cursor: props.disabled ? "not-allowed" : "pointer", // Adjust cursor based on disabled state
  opacity: props.disabled ? 0.5 : 1, // Adjust opacity based on disabled state

  "&:hover": {
    background: "#D3AC0E",
  },
  // Media Queries
  "@media (max-width: 768px)": {
    fontSize: "0.8rem",
    padding: "0.5rem 1.5rem",
  },
}));

export const CtaButton = styled(CustomButton)`
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem;
  }
`;

export const CategoriesButton = styled(CustomButton)((props) => ({
  color: props.selected ? "black" : "white",
  background: props.selected ? " #f4ce14" : "#495e57",
  fontSize: "0.8rem",
  padding: "0.4rem",

  "&:hover": {
    background: props.selected ? "#f4ce14" : "#495e57",
  },
}));
