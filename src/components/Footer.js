import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Footer() {

  return(
    <FooterContainer>
      <FooterContent>
        <Div>
          <H3>Copyright</H3>
          <P>This website is a case study exam for a B&B/hotel booking website for Noroff as a exam. All rights to pictures and data belong to their respective owners.</P>
        </Div>
        <Links>
          <H3>Additional Links</H3>
          <LinkStyle to="/contact">Contact us</LinkStyle>
          <LinkStyle to="/login">Admin login</LinkStyle>
          <LinkStyle to="/">Terms of service</LinkStyle>
          <LinkStyle to="/">Privacy policy</LinkStyle>
        </Links>
      </FooterContent>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.brightMamba};
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1060px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 60px 0;
  margin: 0 30px;
  gap: 20px 0;
`;

const Div = styled.div`
  max-width: 400px;
`;

const P = styled.p`
  margin-top: 15px;
  word-spacing: 2px;
  letter-spacing: .4px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const H3 = styled.h3`
  font-size: 24px;
  margin-bottom: 5px;
`;

const LinkStyle = styled(Link)`
  color: ${props => props.theme.colors.brightMamba};
  font-size: 18px;
  transition: color .2s ease;

  &:hover {
    color: ${props => props.theme.colors.deepDark};
  }
`;