import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import SearchResult from '../utils/searchResults';
import { truncate } from "../utils/truncate";
import MetaTags from 'react-meta-tags';

import { Container, InnerContainer } from '../utils/theme';
import { IconLoading, IconStar } from '../components/Icons';
import { Submit } from '../components/Styles/FormStyle';
import useAxios from '../utils/hooks/useAxios';
import Capitalize from '../utils/capitalize';

export default function SearchPage() {
  const location = useLocation();
  const { dateRange, cityPart, guests } = location.state;
  const [listOfRooms, setListOfRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [roomSearchResults, setRoomSearchResults] = useState([]);
  const call = useAxios();

  useEffect(() => {
    async function getAllMessages() {
      try {
        const res = await call.get(`rooms`);
        setListOfRooms(res.data);
        console.log(res.data)
        setRoomSearchResults(SearchResult(cityPart, dateRange, guests, res.data));
        setRandomNumber(Math.floor(Math.random() * 1000));
      }
      catch (err) {
        setError(err.toString());
      }
      finally {
        setLoading(false);
      }
    }
    getAllMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchRooms = (searchInputValue, dateRange, numberOfGuests) => {
    const search = SearchResult(searchInputValue, dateRange, numberOfGuests, listOfRooms)
    setRoomSearchResults(search);
  }

  return (
    <Container smallTop>
      <MetaTags>
        <title>Holidaze - Search</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze search page. Your home away from home" />
      </MetaTags>
      <InnerContainer>
        <SearchBar listOfRooms={listOfRooms} guests={guests} onClick={searchRooms} />
        <RoomWrap>
          {
            loading ? <IconLoading /> :
              error ? <div>Error {error} </div> :
                roomSearchResults.length > 0 ?
                  roomSearchResults.map(room => {
                    return (
                      <Room key={room.id}>
                        <RoomImg src={JSON.parse(room.pictures)[0]} />
                        <RoomContent>
                          <H1>
                            {truncate(room.title, 50)}
                          </H1>
                          <RoomInfo>
                            <InfoWrap>
                              <RoomShortInfo>
                                {Capitalize(room.housingType)}
                                <div>•</div>
                                {room.guests} guests
                                <div>•</div>
                                {JSON.parse(room.bedroom).bedrooms} bedrooms
                                <div>•</div>
                                {JSON.parse(room.bedroom).bathroom} bathroom
                              </RoomShortInfo>
                              <RoomShortInfo>
                                {JSON.parse(room.amenitiesGeneral).includes('wifi') && <Amenity>WiFi <div>•</div></Amenity>}
                                {JSON.parse(room.kitchen).kitchen >= 1 && <Amenity>Kitchen <div>•</div></Amenity>}
                                {JSON.parse(room.amenitiesGeneral).includes('washer') && 'Washer'}
                              </RoomShortInfo>
                              <DistanceToCenter>
                                {room.distanceToCenter} to city center
                              </DistanceToCenter>

                              <Rating>
                                <IconStarWrap>
                                  <IconStar />
                                </IconStarWrap>
                                <RatingSpan>
                                  {room.rating}/5 ({randomNumber})
                                </RatingSpan>
                              </Rating>
                            </InfoWrap>
                            <RightInfoWrap>
                              <RoomReserveButtonWrap>
                                <PriceWrapper>
                                  <PricePerNight>
                                    {room.price}
                                    <NOK>NOK</NOK>
                                  </PricePerNight>
                                  <PPNLabel>
                                    Price per night
                                  </PPNLabel>
                                </PriceWrapper>
                                <ReserveButton as={Link}
                                  to={{
                                    pathname: `/accommodation/${room.id}`,
                                    state: {
                                      searchedDateRange: dateRange,
                                      searchedGuests: guests
                                    }
                                  }}
                                >
                                  Reserve</ReserveButton>
                              </RoomReserveButtonWrap>
                            </RightInfoWrap>
                          </RoomInfo>
                        </RoomContent>
                      </Room>
                    )
                  }
                  )
                  :
                  <div>No rooms could be found with your search parameters</div>

          }
        </RoomWrap>
      </InnerContainer>
    </Container>
  )
}

const Amenity = styled.div`
  display: flex;
  gap: 10px;
`;

const RoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Room = styled.div`
  display: flex;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 220px;
  @media screen and (max-width: 1110px) {
    height: auto;
    flex-direction: column;
  }
`;

const RoomImg = styled.img`
  height: 220px;
  border-radius: 5px 0 0 5px;
  object-fit: cover;
  @media screen and (min-width: 1110px) {
    width: 345px;
  }
  
`;

const RoomContent = styled.div`
  padding: 20px 30px 20px 15px;
  width: 100%;
  max-width: 715px;
  height: 220px;

  @media screen and (max-width: 1110px) {
    height: auto;
    padding: 15px;
    max-width: none;
  }
`;

const H1 = styled.h1`
  font-size: 24px;
`;

const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1110px) {
    flex-direction: column;
  }

`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
`;

const RightInfoWrap = styled.div`
  display: flex;
  justify-content: flex-end;


  @media screen and (max-width: 1110px) {
    justify-content: flex-start;
    margin-top: 20px;
  }
`;

const RoomShortInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const DistanceToCenter = styled.div`
  font-weight: bold;
  margin: 22px 0;

  @media screen and (max-width: 1110px) {
    width: 100%;
    justify-content: flex-start;
    margin: 10px 0;
  }
`;

const RoomReserveButtonWrap = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;

  @media screen and (max-width: 1110px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const PriceWrapper = styled.div`
  text-align: right;

  @media screen and (max-width: 1110px) {
    text-align: left;
  }
`;

const PricePerNight = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const NOK = styled.span`
  font-size: 20px;
  margin-left: 5px;
`;

const PPNLabel = styled.div`
  font-size: 14px;
  margin-top: -5px;
`;

const ReserveButton = styled(Submit)`
  height: 40px;
  width: 150px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  @media screen and (max-width: 1110px) {
    width: 100%;
  }
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