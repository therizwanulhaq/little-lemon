import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const fontFamily = `"Markazi Text", serif`;

export const Container = styled.div((props) => ({
  margin: props.margin || "0",
  position: "relative",
  padding: props.padding || "2.5rem 15rem",
  background: props.background || "#495e57",
  color: props.color || "#edefee",
  backgroundImage: `url(${props.backgroundImage || ""})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundBlendMode: "multiply",

  [mq[3]]: {
    padding: "2rem 10rem",
  },
  [mq[2]]: {
    padding: "1.5rem 5rem",
  },
  [mq[1]]: {
    padding: "1rem 2rem",
    display: props.display || "",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  },
  [mq[0]]: {
    padding: "0.5rem 1rem",
  },
}));

export const ReviewContainer = styled(Container)`
  ${mq[3]} {
    padding: 3rem 8rem;
  }
  ${mq[2]} {
    padding: 2rem 1rem;
  }

  ${mq[1]} {
    padding: 3rem 0;
  }
`;

export const AboutLilLemonContainer = styled(Container)`
  ${mq[2]} {
    padding: 2.5rem 5rem;
  }
  ${mq[1]} {
    padding: 2rem;
  }
  ${mq[0]} {
    padding: 2rem 1rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily};
  font-size: ${(props) => props.fontSize || "4rem"};
  font-weight: 400;
  line-height: 3rem;
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
  ${mq[2]} {
    font-size: 2.2rem;
  }
  ${mq[0]} {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  margin-top: 1rem;
  font-family: ${fontFamily};
  text-align: ${(props) => props.textAlign || ""};
  font-size: ${(props) => props.fontSize || "1.7rem"};
  ${mq[2]} {
    font-size: 1.6rem;
  }
  ${mq[1]} {
    margin-top: 1rem;
  }
  ${mq[0]} {
    font-size: 1rem;
    margin-top: 0.5rem;
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
    border-radius: 0.2rem;
  }
  ${mq[0]} {
    width: 25rem;
    height: 12rem;
  }
`;

export const ImageContainer = styled.div`
  width: 15rem;
  ${mq[1]} {
    display: none;
  }
`;

export const Img2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.5rem;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: ${(props) => props.top || "4rem"};
  right: ${(props) => props.right || ""};
  left: ${(props) => props.left || ""};
  width: ${(props) => props.width || "15rem"};
  height: ${(props) => props.height || "15rem"};
  background-image: url(${(props) => props.imageUrl || ""});
  background-size: ${(props) => props.backgroundSize || "contain"};
  background-repeat: no-repeat;
  background-position: ${(props) => props.backgroundPosition || "center"};
  transform: rotate(${(props) => props.rotation || "43deg"});
  z-index: -1;

  ${mq[1]} {
    display: none;
  }
`;

export const TitleWithLines = styled.h1`
  background: white;
  display: flex;
  align-items: center;
  text-align: center;
  color: #333;
  padding: 2.5rem 15rem;
  font-size: 1.7rem;
  font-weight: 400;
  letter-spacing: 2px;
  height: 15rem;

  ::before,
  ::after {
    content: "";
    flex: 1;
    border-top: 1px solid #333;
    margin: 0 1rem;
  }
  ${mq[3]} {
    padding: 2rem 10rem;
  }
  ${mq[2]} {
    padding: 1.5rem 5rem;
  }

  ${mq[1]} {
    letter-spacing: 0;
    padding: 1rem 2rem;
    font-weight: 500;
    height: 10rem;
  }
  ${mq[0]} {
    font-size: 1.1rem;
    font-weight: 500;
    height: 8rem;
    padding: 0.5rem;
  }
`;
