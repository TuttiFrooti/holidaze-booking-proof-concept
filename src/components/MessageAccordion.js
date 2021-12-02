import styled from "styled-components";

export default function MessageAccordion({ message, onClick, open }) {
  return(
    <AccordionContainer onClick={onClick} data-id={message.id}>
      <Top data-id={message.id}>
        <H3 open={open} data-id={message.id}>#{message.id}</H3>
        <H3 open={open} data-id={message.id}>{message.name}</H3>
        <H3 open={open} data-id={message.id} titleElm>{message.title}</H3>
      </Top>
      <Content open={open}>
        <Div>
          <H2>Message</H2>
          <p>{message.message}</p>
        </Div>
        <Div>
          <H2>Contact information</H2>
          <ContactInfoContainer>
            <ContactInfo>
              <HeaderSpan>Phone Number:</HeaderSpan>
              <Span>{message.phoneNumber}</Span>
            </ContactInfo>
            <ContactInfo>
              <HeaderSpan>Email:</HeaderSpan>
              <Span>{message.email}</Span>
            </ContactInfo>
          </ContactInfoContainer>
        </Div>
      </Content>
    </AccordionContainer>
  )
}

const AccordionContainer = styled.div`
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: .8fr 2fr 10fr;
  grid-column-gap: 50px;
  padding: 25px 30px;
  cursor: pointer;

  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05);

  @media only screen and (max-width: 1090px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const H3 = styled.h3`
  font-size: 18px;
  font-weight: normal;
  position: relative;

  ${props => props.titleElm && `
    font-weight: bold;
  `}
`;

const Content = styled.div`
  display: none;
  flex-direction: column;
  gap: 30px;
  padding: 25px 30px;

  ${props => props.open && `
    display: flex;
  `}
`;

const H2 = styled.h2`
  margin-bottom: 15px;
  font-size: 24px;
`;

const Div = styled.div`

`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 50px;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;

  @media only screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

const HeaderSpan = styled.span`
`;

const Span = styled.span`
  font-weight: bold;
`;