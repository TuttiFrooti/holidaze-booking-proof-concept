import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../utils/hooks/useAxios';
import Capitalize from '../utils/capitalize';
import SearchBar from "../components/SearchBar";
import { useMediaQuery } from 'react-responsive';
import mapImg from '../assets/map.png';
import { Container, InnerContainer } from '../utils/theme';
import { Submit } from '../components/Styles/FormStyle';
import { DateRangeWrap, DateRangeLabelsWrap, DateRangeLabels, DateRangeRightLabel, DateRangeStyle, DateRangeSplitter } from '../components/Styles/DateRange';
import { GuestsInput, GuestsInputInner, GuestPickerWrap, GuestPicker, GuestPickerContent, GuestPickerClose, Picker, UpDownButtons } from '../components/Styles/GuestPickerStyle';
import { IconLoading, IconStar, IconMoon, IconWifi, IconHome, IconBath, IconKitchen, IconUsers, IconUp, IconDown } from '../components/Icons';
import getNights from '../utils/getNights';
import MetaTags from 'react-meta-tags';

export default function AccommodationPage() {
  const location = useLocation();
  const { searchedDateRange, searchedGuests } = !!location.state ? location.state : { searchedDateRange: [new Date(), new Date()], searchedGuests: '2' };
  const { id } = useParams();

  const isNotDesktop = useMediaQuery({
    query: 'screen and (min-width: 990px)'
  })

  const [accomodation, setAccomodation] = useState([]);
  const [allPictures, setAllPictures] = useState(null);
  const [firstFewPictures, setFirstFewPics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(parseInt(searchedGuests) || 2);
  const [amenitiesBathroom, setAmenitiesBathroom] = useState([]);
  const [amenitiesKitchen, setAmenitiesKitchen] = useState([]);
  const [amenitiesGeneral, setAmenitiesGeneral] = useState([]);
  const [bathroom, setBathroom] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [guestsPicker, setGuestsPicker] = useState(null);
  const [dateRange, setDateRange] = useState(searchedDateRange);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [responsiveResShow, setResponsiveResShow] = useState(null);

  const [randomNumber, setRandomNumber] = useState(0);
  const call = useAxios();

  useEffect(() => {
    async function getAccomodation() {
      try {
        const res = await call.get(`rooms/${id}`);
        setAccomodation(res.data);
        setAllPictures(JSON.parse(res.data.pictures));
        const pictures = JSON.parse(res.data.pictures);
        pictures.shift()
        const FirstFewPics = pictures.filter((item, index) => index < 4);
        setFirstFewPics(FirstFewPics);
        setRandomNumber(Math.floor(Math.random() * 1000));
        setAmenitiesBathroom(JSON.parse(res.data.amenitiesBathroom));
        setAmenitiesKitchen(JSON.parse(res.data.amenitiesKitchen));
        setAmenitiesGeneral(JSON.parse(res.data.amenitiesGeneral));

        setBathroom(JSON.parse(res.data.bathroom));
        setKitchen(JSON.parse(res.data.kitchen));

        setTotalNights(getNights(dateRange));
        setTotalPrice(parseInt(res.data.price) * parseInt(getNights(dateRange)) + 300);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    getAccomodation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateChange = (date) => {
    setDateRange(date);
    setTotalNights(getNights(date));
    setTotalPrice(parseInt(accomodation.price) * parseInt(getNights(date)) + 300);
  }

  return (
    <Container smallTop>
      <MetaTags>
        <title>Holidaze - {accomodation.title}</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze. Your home away from home" />
      </MetaTags>
      <InnerContainer>
        <SearchBar />
        {
          loading ? <IconLoading /> :
            error ? <div>Error {error} </div> :

              <div>
                <ImageWrap>
                  <MainImg src={allPictures[0]} />
                  <ExtraPictures>
                    {
                      firstFewPictures.map((picture, i) => {
                        return (
                          <Picture key={i} src={picture} />
                        )
                      })
                    }
                  </ExtraPictures>
                </ImageWrap>

                <ContentWrapper>
                  <LeftContent>
                    <H1Wrap>
                      <H1>{accomodation.title}</H1>
                      <span>{accomodation.cityArea}, {accomodation.distanceToCenter} to city center</span>
                    </H1Wrap>

                    <ShortInfoWrap>
                      <ShortInfo>
                        <ShortInfoItem>
                          <IconWrap><IconHome /></IconWrap>
                          {Capitalize(accomodation.housingType)}
                        </ShortInfoItem>
                        <ShortInfoItem>
                          <IconWrap><IconUsers /></IconWrap>
                          Hosts: {accomodation.guests} guests
                        </ShortInfoItem>
                        <ShortInfoItem>
                          <IconWrap><IconBath /></IconWrap>
                          Bathrooms: {bathroom.bathrooms}, {bathroom.shared ? 'shared' : 'private'}
                        </ShortInfoItem>
                        <ShortInfoItem>
                          <IconWrap><IconKitchen /></IconWrap>
                          Kitchen: {kitchen.kitchen}, {kitchen.shared ? 'shared' : 'private'}
                        </ShortInfoItem>
                      </ShortInfo>
                      <ShortInfo>
                        {accomodation.quietArea &&
                          <ShortInfoItem>
                            <IconWrap><IconMoon /></IconWrap>
                            Quiet Area
                          </ShortInfoItem>}
                        {amenitiesGeneral.includes('wifi') &&
                          <ShortInfoItem>
                            <IconWrap><IconWifi /></IconWrap>
                            Wifi included
                          </ShortInfoItem>}
                      </ShortInfo>
                    </ShortInfoWrap>

                    <ContentCont>
                      <H2>Description</H2>
                      <Description>
                        {accomodation.description}
                      </Description>
                    </ContentCont>
                    <ContentCont>
                      <H2>Kitchen amenities</H2>
                      <AmenitiesCont>
                        {
                          amenitiesKitchen.map((amenity, i) => {
                            return <div key={i}>{Capitalize(amenity)}</div>
                          })
                        }
                      </AmenitiesCont>
                    </ContentCont>
                    <ContentCont>
                      <H2>Bathroom amenities</H2>
                      <AmenitiesCont>
                        {
                          amenitiesBathroom.map((amenity, i) => {
                            return <div key={i}>{Capitalize(amenity)}</div>
                          })
                        }
                      </AmenitiesCont>
                    </ContentCont>
                    <ContentCont>
                      <H2>General amenities</H2>
                      <AmenitiesCont>
                        {
                          amenitiesGeneral.map((amenity, i) => {
                            return <div key={i}>{Capitalize(amenity)}</div>
                          })
                        }
                      </AmenitiesCont>
                    </ContentCont>
                    <ContentCont ImgCont>
                      <H2>Location</H2>
                      <SubLabel>Exact location will be revieled upon booking</SubLabel>
                      <Map src={mapImg} />
                    </ContentCont>
                  </LeftContent>
                  {isNotDesktop ?
                    <RightContent>
                      <ReserveWrapper>
                        <ReserveInner>
                          <ReservePriceRating>
                            <Price>
                              <PriceSpan>
                                {accomodation.price}
                                <NOK>NOK</NOK>
                              </PriceSpan>
                              <PriceSub>
                                Price per night
                              </PriceSub>
                            </Price>
                            <Rating>
                              <IconStarWrap>
                                <IconStar />
                              </IconStarWrap>
                              <RatingSpan>
                                {accomodation.rating}/5 ({randomNumber})
                              </RatingSpan>
                            </Rating>
                          </ReservePriceRating>

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
                              <GuestsInput small
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

                          <ReserveButton
                            as={Link}
                            to={{
                              pathname: '/booking',
                              state: {
                                accomodation: accomodation,
                                reserveDateRange: dateRange,
                                reserveGuests: numberOfGuests,
                              }
                            }}>
                            Reserve
                          </ReserveButton>

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

                    :
                    <ResponsiveReserveWrapper>
                      <ResponsiveReserveShownWrap >
                        <ResButtonOpen>
                          <ResIconWrap onClick={() => { setResponsiveResShow(!responsiveResShow) }}>
                            <IconUp />
                          </ResIconWrap>
                        </ResButtonOpen>
                        <ResShownCont>
                          <div>
                            {totalNights} nights
                          </div>
                          <TotalPriceElement accord>
                            <TotalPrice>Total cost:</TotalPrice>
                            <TotalPrice>{totalPrice} NOK</TotalPrice>
                          </TotalPriceElement>
                        </ResShownCont>
                      </ResponsiveReserveShownWrap>
                      
                      <ResponsiveReserveCont show={responsiveResShow}>
                        <ResButtonClose show={responsiveResShow} onClick={() => { setResponsiveResShow(!responsiveResShow) }}>
                          <ResIconWrap>
                            <IconDown />
                          </ResIconWrap>
                        </ResButtonClose>
                        <ResInfoCont>
                          <ReserveInner responsive>
                            <ReservePriceRating>
                              <Price>
                                <PriceSpan>
                                  {accomodation.price}
                                  <NOK>NOK</NOK>
                                </PriceSpan>
                                <PriceSub>
                                  Price per night
                                </PriceSub>
                              </Price>
                              <Rating>
                                <IconStarWrap>
                                  <IconStar />
                                </IconStarWrap>
                                <RatingSpan>
                                  {accomodation.rating}/5 ({randomNumber})
                                </RatingSpan>
                              </Rating>
                            </ReservePriceRating>

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

                            <ReserveButton
                              as={Link}
                              to={{
                                pathname: '/booking',
                                state: {
                                  accomodation: accomodation,
                                  reserveDateRange: dateRange,
                                  reserveGuests: numberOfGuests,
                                }
                              }}>
                              Reserve
                            </ReserveButton>
                          </ReserveInner>
                        </ResInfoCont>

                      </ResponsiveReserveCont>
                    </ResponsiveReserveWrapper>
                  }
                </ContentWrapper>
              </div>
        }
      </InnerContainer>
    </Container>
  )
}

const ResponsiveReserveWrapper = styled.div`
  position: relative;
`;

const ResponsiveReserveShownWrap = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 60px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.colors.brightMamba};
  box-shadow: 0px -6px 15px rgba(0, 0, 0, 0.1);
`;

const ResButtonOpen = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: -20px;
  color: ${props => props.theme.colors.primary};
`;

const ResButtonClose = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  width: 100%;
  position: absolute;
  top: -20px;
  color: ${props => props.theme.colors.primary};
`;

const ResIconWrap = styled.div`
  background-color: ${props => props.theme.colors.brightMamba};
  padding: 5px 30px;
  border-radius: 40px 40px 0 0;
  box-shadow: 0px -6px 15px rgba(0, 0, 0, 0.1);
`;

const ResponsiveReserveCont = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: ${props => props.show ? '0' : '-250px'};
  left: 0;
  border-radius: 10px 10px 0 0;
  transition: all .2s ease;
  background-color: ${props => props.theme.colors.brightMamba};
  width: 100%;
  height: 400px;
  box-shadow: 0px -6px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 500px) {
    height: 500px;
  }
`;

const ResShownCont = styled.div`
  padding: 10px 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const ResInfoCont = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ContentCont = styled.div`
  margin: 20px 0;
`;

const H2 = styled.h2`
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.colors.deepDark};
  margin-bottom: 20px;
  max-width: 550px;
  @media screen and (max-width: 990px) {
    max-width: none;
  }
`;
const Description = styled.div`
  max-width: 550px;
  @media screen and (max-width: 990px) {
    max-width: none;
  }
`;

const AmenitiesCont = styled.div`
  max-width: 550px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 15px;
  @media screen and (max-width: 990px) {
    max-width: none;
  }
`;

const SubLabel = styled.div`
  margin-bottom: 10px;
`;

const Map = styled.img`
  border-radius: 5px;
  max-width: 550px;
  width: 100%;
  object-fit: cover;

  @media screen and (max-width: 990px) {
    max-width: none;
    max-height: 300px;
  }
`;

const H1Wrap = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.deepDark};
  padding-bottom: 10px;
  max-width: 550px;
  @media screen and (max-width: 990px) {
    max-width: none;
  }
`;

const H1 = styled.h1`
  font-size: 26px;
  margin-bottom: 2px;
`;

const ShortInfoWrap = styled.div`
  height: 165px;
  margin-top: 20px;
  max-width: 550px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 15px;
  @media screen and (max-width: 990px) {
    max-width: none;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ShortInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrap = styled.div`
  color: ${props => props.theme.colors.primary};
  width: 30px;
  display: flex;
  justify-content: center;
  font-size: 25px;
`;

const ImageWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  @media screen and (max-width: 1120px) {
    flex-direction: column;
  }
`;

const MainImg = styled.img`
  width: 650px;
  height: 400px;
  border-radius: 5px;

  @media screen and (max-width: 1120px) {
    width: 100%;
    object-fit: cover;
  }
`;

const ExtraPictures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 400px;

  @media screen and (max-width: 1120px) {
    width: 100%;
    /* flex-wrap: nowrap; */
  }
`;

const Picture = styled.img`
  height: 195px;
  width: 195px;
  border-radius: 5px;
  @media screen and (max-width: 1120px) {
    /* max-width: 100px; */
    flex: 2 1 auto;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const LeftContent = styled.div`
  width: 650px;

  @media screen and (max-width: 990px) {
    width: 100%;
  }
`;

const RightContent = styled.div`
  width: 400px;
  position: relative;
`;

const ReserveWrapper = styled.div`
  position: sticky;
  top: 30px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  border-radius: 5px;
`;

const ReserveInner = styled.div`
  padding: ${props => props.responsive ? '10px 20px' : '35px'};
`;

const ReservePriceRating = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PriceSpan = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

const NOK = styled.span`
  font-size: 20px;
  margin-left: 5px;
`;

const PriceSub = styled.span`
  font-size: 14px;
  margin-top: -5px;
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

  ${props => props.accord && `
    gap: 10px;
  `}
`;

const TotalPriceSplitter = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.deepDark};
`;
const TotalPrice = styled.div`
  font-weight: bold;
`;

const ReserveButton = styled(Submit)`
  height: 40px;
  margin-top: 30px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;