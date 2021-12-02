import styled from "styled-components";
import moment from 'moment';
import getNights from "../utils/getNights";

export default function ReservationAccordion({ reservation, onClick, open }) {
  return (
    <AccordionContainer onClick={onClick} data-id={reservation.id}>
      <Top data-id={reservation.id}>
        <H3 open={open} data-id={reservation.id}>#{reservation.id}</H3>
        <H3 open={open} data-id={reservation.id}>{`${reservation.firstName} ${reservation.lastName}`}</H3>
        <H3 open={open} data-id={reservation.id} titleElm>{getNights([reservation.checkInDate, reservation.checkOutDate])} nights booked</H3>
      </Top>
      <Content open={open}>
        <div>
          <H2>Booking information</H2>
          <InfoContainer wide>
            <InfoWrap>
              <Info>
                <HeaderSpan>Check-in:</HeaderSpan>
                <Span>{moment(reservation.checkInDate).format("DD/MM/YYYY")}</Span>
              </Info>
              <Info>
                <HeaderSpan>Check-out:</HeaderSpan>
                <Span>{moment(reservation.checkOutDate).format("DD/MM/YYYY")}</Span>
              </Info>
              <Info>
                <HeaderSpan>Duration:</HeaderSpan>
                <Span>{getNights([reservation.checkInDate, reservation.checkOutDate])}</Span>
              </Info>
            </InfoWrap>
            <InfoWrap>
              <Info>
                <HeaderSpan>Guests:</HeaderSpan>
                <Span>{reservation.guestCount}</Span>
              </Info>
              <Info>
                <HeaderSpan>Price paid:</HeaderSpan>
                <Span>{reservation.price}</Span>
              </Info>
            </InfoWrap>
          </InfoContainer>
        </div>
        <div>
          <H2> information</H2>
          <InfoContainer>
            <InfoWrap>
              <Info>
                <HeaderSpan>Full name:</HeaderSpan>
                <Span>{`${reservation.firstName} ${reservation.lastName}`}</Span>
              </Info>
              <Info>
                <HeaderSpan>Phone Number:</HeaderSpan>
                <Span>{reservation.phoneNumber}</Span>
              </Info>
              <Info>
                <HeaderSpan>Email:</HeaderSpan>
                <Span>{reservation.email}</Span>
              </Info>
            </InfoWrap>
          </InfoContainer>
        </div>
        <div>
          <H2>Message to host</H2>
          <p>{reservation.note}</p>
        </div>
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.wide ? 'row' : 'column'};
  flex-wrap: wrap;
  gap: 0 5px;
`;

const InfoWrap = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 18px;

  @media only screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
`;

const HeaderSpan = styled.span`
  @media only screen and (max-width: 640px) {
  font-size: 16px;
  }
`;

const Span = styled.span`
  font-weight: bold;
`;