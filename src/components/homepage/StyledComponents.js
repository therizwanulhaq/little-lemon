import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const fontFamily = `"Markazi Text", serif`;

export const Container = styled.div`
  margin: ${(props) => props.margin || "0"};
  position: relative;
  overflow: hidden;
  padding: ${(props) => props.padding || "2.5rem 15rem"};
  background: ${(props) => props.background || "#495e57"};
  color: ${(props) => props.color || "#edefee"};

  ${mq[3]} {
    padding: 2rem 10rem;
  }
  ${mq[2]} {
    padding: 1.5rem 5rem;
  }
  ${mq[1]} {
    padding: 0.5rem 2rem;
    display: ${(props) => props.display || ""};
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily};
  font-size: ${(props) => props.fontSize || "4rem"};
  font-weight: 400;
  color: ${(props) => props.color || "#f4ce14"};
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin || "0"};
  ${mq[2]} {
    font-size: 3.5rem;
  }
  ${mq[0]} {
    font-size: 1.8rem;
  }
`;

export const SubTitle = styled.h2`
  font-family: ${fontFamily};
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1rem;
  ${mq[2]} {
    font-size: 2.2rem;
  }
  ${mq[0]} {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  margin-top: 2rem;
  font-family: ${fontFamily};
  font-size: 1.7rem;
  ${mq[2]} {
    font-size: 1.6rem;
  }
  ${mq[1]} {
    margin-top: 1.3rem;
  }
  ${mq[0]} {
    font-size: 1rem;
    margin-top: 1.5rem;
  }
`;

export const Br = styled.br`
  ${mq[0]} {
    display: none;
  }
`;

export const AdImg = styled.img`
  position: absolute;
  top: 1rem;
  right: 15rem;
  border-radius: 1rem;
  width: 17rem;
  height: 22rem;

  ${mq[3]} {
    top: 2rem;
    right: 10rem;
    width: 18rem;
    height: 23rem;
  }
  ${mq[2]} {
    top: 1.5rem;
    right: 5rem;
    width: 15rem;
    height: 20rem;
  }
  ${mq[1]} {
    position: static;
    width: 12rem;
    height: 16rem;
  }
  ${mq[0]} {
    position: static;
    width: 18rem;
    height: 12rem;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 17.5rem;
  height: 20rem;
  margin-left: 15rem;
  ${mq[1]} {
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

export const BackgroundImage = styled.div`
  content: "";
  position: absolute;
  top: ${(props) => props.top || "4rem"};
  right: ${(props) => props.right || ""};
  left: ${(props) => props.left || ""};
  width: ${(props) => props.width || "17rem"};
  height: ${(props) => props.height || "17rem"};
  background-image: url(${(props) => props.imageUrl || ""});
  background-size: ${(props) => props.backgroundSize || "contain"};
  background-repeat: no-repeat;
  background-position: ${(props) => props.backgroundPosition || "center"};
  background-blend-mode: ${(props) => props.backgroundBlendMode || "exclusion"};
  transform: rotate(${(props) => props.rotation || "43deg"});
  z-index: -1;

  ${mq[1]} {
    display: none;
  }
`;
