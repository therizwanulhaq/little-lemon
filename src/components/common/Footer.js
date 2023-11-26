import React from "react";
import styled from "@emotion/styled";

import logo from "../../assets/Asset 18@4x.png";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const FooterContainer = styled.footer`
  margin-top: 3.5rem;
  background: #efeeee;
  color: #333333;
  padding: 2.5rem 15rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mq[3]} {
    padding: 2.5rem 10rem;
  }
  ${mq[2]} {
    padding: 1.5rem 5rem;
  }
  ${mq[1]} {
    padding: 0.5rem 2rem;
  }
`;

const Logo = styled.img`
  width: 130px;
`;

const LinkSection = styled.div`
  margin-top: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #333333;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo src={logo} alt="Logo" />
      <LinkSection>
        <SectionTitle>Doormat Navigation</SectionTitle>
        <FooterLink href="#">Home</FooterLink>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Menu</FooterLink>
        <FooterLink href="#">Reservations</FooterLink>
        <FooterLink href="#">Order Online</FooterLink>
        <FooterLink href="#">Login</FooterLink>
      </LinkSection>
      <LinkSection>
        <SectionTitle>Contact</SectionTitle>
        <FooterLink href="#">Address</FooterLink>
        <FooterLink href="#">Phone Number</FooterLink>
        <FooterLink href="#">Email</FooterLink>
      </LinkSection>
      <LinkSection>
        <SectionTitle>Socials</SectionTitle>
        <FooterLink href="#">Instagram</FooterLink>
        <FooterLink href="#">Facebook</FooterLink>
        <FooterLink href="#">Twitter</FooterLink>
      </LinkSection>
    </FooterContainer>
  );
};

export default Footer;
