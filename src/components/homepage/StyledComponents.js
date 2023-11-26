import styled from "@emotion/styled";

const fontFamily = `"Markazi Text", serif`;
export const Container = styled.div`
  margin: ${(props) => props.margin || "0"};
  position: relative;
  padding: ${(props) => props.padding || "0.5rem 15rem"};
  background: ${(props) => props.background || "#495e57"};
  color: ${(props) => props.color || "#edefee"};
  @media (max-width: 768px) {
    padding: 0.5rem 2rem; // Adjust padding for smaller screens
  }
`;
export const Title = styled.h1`
  font-family: ${fontFamily};
  font-size: ${(props) => props.fontSize || "4rem"};
  font-weight: 400;
  color: ${(props) => props.color || "#f4ce14"};
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin || "0"};
`;
export const SubTitle = styled.h2`
  font-family: ${fontFamily};
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1rem;
`;
export const Description = styled.p`
  margin-top: 2.5rem;
  font-family: ${fontFamily};
  font-size: 1.7rem;
`;
export const AdImg = styled.img`
  position: absolute;
  top: 1rem;
  right: 15rem;
  border-radius: 1rem;
  width: 17rem;
  height: 22rem;
  @media (max-width: 768px) {
    display: none; // Hide the image on smaller screens
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 17.5rem;
  height: 20rem;
  margin-left: 15rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Img2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Img3 = styled.img`
  position: absolute;
  top: 5rem;
  right: 12rem;
  width: 17.5rem;
  height: 20rem;
  object-fit: cover;
`;
