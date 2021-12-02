import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import getNights from '../utils/getNights';
import { Container, InnerContainer, H1, SubH } from "../utils/theme";
import { IconStar} from '../components/Icons';
import { Form, InputWrap, Input, TextArea, Label, FormError, FormSuccess, Submit } from '../components/Styles/FormStyle';
import { DateRangeWrap, DateRangeLabelsWrap, DateRangeLabels, DateRangeRightLabel, DateRangeStyle, DateRangeSplitter } from '../components/Styles/DateRange';
import { GuestsInput, GuestsInputInner, GuestPickerWrap, GuestPicker, GuestPickerContent, GuestPickerClose, Picker, UpDownButtons } from '../components/Styles/GuestPickerStyle';
import { BASE_URL } from '../constants/api';
import { reserveSchema } from '../constants/schemas';
import MetaTags from 'react-meta-tags';

export default function ReservationPage() {
  const location = useLocation();
  const { accomodation, reserveDateRange, reserveGuests } = location.state;

  const [sendMessageError, setSendMessageError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(parseInt(reserveGuests) || 2);
  const [guestsPicker, setGuestsPicker] = useState(null);
  const [dateRange, setDateRange] = useState(reserveDateRange);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [randomNumber, setRandomNumber] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(reserveSchema)
  });

  const url = `${BASE_URL}reservations`;

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000));
    setTotalNights(getNights(dateRange));
    setTotalPrice(parseInt(accomodation.price) * parseInt(getNights(dateRange)) + 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async data => {

    if (getNights(dateRange) === 0) {
      setSendMessageError('Please select your nights');
    }
    else {
      data.hotelID = accomodation.id;
      data.guestCount = parseInt(numberOfGuests);
      data.checkInDate = dateRange[0];
      data.checkOutDate = dateRange[1];
      data.price = totalPrice;

      console.log('data', data)

      try {
        const res = await axios.post(url, data);
        if (!!res.data) {
          setSuccess(true);
        } else {
          setSendMessageError('Something went wrong, please try again');
        }
      } catch (err) {
        setSendMessageError('Something went wrong, please try again.');
      }
    }

  }

  const dateChange = (date) => {
    setDateRange(date);
    setTotalNights(getNights(date));
    setTotalPrice(parseInt(accomodation.price) * parseInt(getNights(date)) + 300);
  }

  return (
    <Container>
      <MetaTags>
        <title>Holidaze - {accomodation.title}</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze reservation page. Your home away from home" />
      </MetaTags>
      <ContentWrap>
        <LeftContent>
          <H1>Fill in your contact information</H1>
          <SubH>Required fields</SubH>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormSuccess success={success}>Your reservation has been made!</FormSuccess>
            <FormError main>{sendMessageError}</FormError>
            <InputWrap>
              <Label required>What is your first name?</Label>
              <Input type="text" name="firstName" {...register('firstName', { required: true })} placeholder="First name..." />
              <FormError>{errors.firstName?.message}</FormError>
            </InputWrap>
            <InputWrap>
              <Label required>What is your last name?</Label>
              <Input type="text" name="lastName" {...register('lastName', { required: true })} placeholder="Last name..." />
              <FormError>{errors.lastName?.message}</FormError>
            </InputWrap>
            <InputWrap>
              <Label required>What is your email address?</Label>
              <Input type="email" name="email" {...register('email', { required: true })} placeholder="Email address..." />
              <FormError>{errors.email?.message}</FormError>
            </InputWrap>
            <InputWrap>
              <Label required>What is your phone number?</Label>
              <Input type="number" name="phoneNumber" {...register('phoneNumber', { required: true })} placeholder="Phone number..." />
              <FormError>{errors.phoneNumber?.message}</FormError>
            </InputWrap>
            <InputWrap>
              <Label>Is there anything the host should know?</Label>
              <TextArea type="text" name="note" {...register('note')} placeholder="Message..." />
              <FormError>{errors.note?.message}</FormError>
            </InputWrap>

            <Submit type="submit" m10>Reserve</Submit>
          </Form>
        </LeftContent>
        <RightContent>
          <ReserveWrapper>
            <ReserveInner>
              <div>
                <ReserveImg src={JSON.parse(accomodation.pictures)[0]}/>
                <H2>{accomodation.title}</H2>
                <InfoWrap>
                  <div>
                    {accomodation.cityArea}, Bergen
                  </div>
                  <Rating>
                    <IconStarWrap>
                      <IconStar />
                    </IconStarWrap>
                    <RatingSpan>
                      {accomodation.rating}/5 ({randomNumber})
                    </RatingSpan>
                  </Rating>
                </InfoWrap>
              </div>

              <DateRangeWrap>
                <DateRangeLabelsWrap>
                  <DateRangeLabels>
                    Check in
                  </DateRangeLabels>
                  <DateRangeSplitter small />
                  <DateRangeLabels>
                    <DateRangeRightLabel>
                      Check out
                    </DateRangeRightLabel>
                  </DateRangeLabels>
                </DateRangeLabelsWrap>
                <DateRangeStyle accomodationPage
                  onChange={dateChange}
                  value={dateRange}
                  className="picker"
                  calendarIcon={null}
                  rangeDivider={<DateRangeSplitter />}
                  clearIcon={null}
                  required={true}
                  format={'dd-MM-y'}
                />
                <GuestPickerWrap>
                  <GuestsInput small responsive
                    type="text"
                    data-value={numberOfGuests}
                    onClick={() => { setGuestsPicker(!guestsPicker) }}
                  >
                    <GuestsInputInner>{numberOfGuests} guests</GuestsInputInner>
                  </GuestsInput>
                  <GuestPicker show={guestsPicker}>
                    <GuestPickerContent>
                      Guests:
                      <Picker>
                        <UpDownButtons onClick={() => setNumberOfGuests(numberOfGuests - 1)}>-</UpDownButtons>
                        {numberOfGuests}
                        <UpDownButtons onClick={() => setNumberOfGuests(numberOfGuests + 1)}>+</UpDownButtons>
                      </Picker>

                    </GuestPickerContent>
                    <GuestPickerContent close>
                      <GuestPickerClose onClick={() => { setGuestsPicker(!guestsPicker) }}>Close</GuestPickerClose>
                    </GuestPickerContent>
                  </GuestPicker>
                </GuestPickerWrap>
              </DateRangeWrap>

              <TotalPriceWrap>
                <TotalPriceElement>
                  <div>{accomodation.price} x {totalNights} nights</div>
                  <div>{parseInt(accomodation.price) * parseInt(totalNights)} NOK</div>
                </TotalPriceElement>
                <TotalPriceElement>
                  <div>
                    Cleaning Fee
                  </div>
                  <div>
                    300 NOK
                  </div>
                </TotalPriceElement>
                <TotalPriceSplitter />
                <TotalPriceElement>
                  <TotalPrice>Total</TotalPrice>
                  <TotalPrice>{totalPrice} NOK</TotalPrice>
                </TotalPriceElement>
              </TotalPriceWrap>

            </ReserveInner>
          </ReserveWrapper>
        </RightContent>
      </ContentWrap>
    </Container>
  )
}

const ReserveImg = styled.img`
  width: 330px;
  border-radius: 5px;

  @media screen and (max-width:1090px) {
    width: 100%;
    object-fit: cover;
    max-height: 300px;
  }
`;

const H2 = styled.h2`
  font-size: 18px;
  margin-top: 20px;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  margin-bottom: 30px;
`;

const ContentWrap = styled(InnerContainer)`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap-reverse;

  @media screen and (max-width:1090px) {
    justify-content: center;
    gap: 30px;
  }
`;

const LeftContent = styled.div`
  max-width: 600px;
  width: 100%;
`;

const RightContent = styled.div`
  width: 400px;
  position: relative;

  @media screen and (max-width:1090px) {
    width: 100%;
  }
`;

const ReserveWrapper = styled.div`
  position: sticky;
  top: 30px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  border-radius: 5px;
  @media screen and (max-width:1090px) {
    width: 100%;
  }
`;

const ReserveInner = styled.div`
  padding: 35px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const IconStarWrap = styled.div`
  color: ${props => props.theme.colors.success};
`;

const RatingSpan = styled.span`
  margin-left: 5px;
`;

const TotalPriceWrap = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalPriceElement = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPriceSplitter = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.deepDark};
`;
const TotalPrice = styled.div`
  font-weight: bold;
`;