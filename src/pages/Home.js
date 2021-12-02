import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAxios from '../utils/hooks/useAxios';
import { Container, InnerContainer } from '../utils/theme';
import MetaTags from 'react-meta-tags';

import { Form, Input, Submit } from '../components/Styles/FormStyle';
import { IconLoading } from '../components/Icons';
import HeaderImg from '../assets/header.jpg';
import PromotedRoom from '../components/PromotedRoom';
import useDebounce from '../utils/hooks/useDebounce';
import { DateRangeWrap, DateRangeLabelsWrap, DateRangeLabels, DateRangeRightLabel, DateRangeStyle, DateRangeSplitter } from '../components/Styles/DateRange';
import { GuestsInput, GuestsInputInner, GuestPickerWrap, GuestPicker, GuestPickerContent, GuestPickerClose, Picker, UpDownButtons } from '../components/Styles/GuestPickerStyle';

export default function Home() {
  
  const [listOfRooms, setListOfRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeaheadInput, setTypeaheadInput] = useDebounce('');
  const [searchResult, setSearchResult] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [guestsPicker, setGuestsPicker] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const call = useAxios();

  useEffect(() => {
    async function getAllMessages() {
      try {
        const res = await call.get(`rooms`);
        setListOfRooms(res.data);
      }
      catch (err) {
        setError(err.toString());
      }
      finally {
        setLoading(false);
      }
    }
    getAllMessages();

    async function getSearchResult() {
      if (!!typeaheadInput) {
        // Change the system to call the API with filters
        // https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
        const t = listOfRooms.filter(e => e.cityArea.toLowerCase().includes(typeaheadInput));
        setSearchResult(t);
      } 
      else if (typeaheadInput === '') {
        setSearchResult(null);
      }
    }

    getSearchResult();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeaheadInput]);

  const typeaheadOnClick = e => {
    setSearchInputValue(e.target.dataset.content);
    setSearchResult(null);
  }

  const typeaheadOnChange = e => {
    setTypeaheadInput(e.currentTarget.value);
    setSearchInputValue(e.currentTarget.value);
  }

  return (
    <HomeCont>
      <MetaTags>
        <title>Holidaze - Home</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze. Your home away from home" />
      </MetaTags>
      <Header src={HeaderImg} />
      <Container>
        <InnerContainer>
          <SearchBox>
            <H1>Find your home away from home.</H1>
            <Div>
              <HomeForm>
                <SearchWrap>
                  <HomeInput onChange={typeaheadOnChange} type="text" placeholder="What part of the city do you want to visit?" value={searchInputValue} />
                  <SearchResultWrap show={searchResult}>
                    {!!searchResult && searchResult.map( result => {
                      return (
                        <Result key={result.id} onClick={typeaheadOnClick} data-content={result.cityArea}>
                          {result.cityArea}
                        </Result>
                      )
                    })
                    }
                  </SearchResultWrap>
                </SearchWrap>

                <DateRangeWrap>
                  <DateRangeLabelsWrap >
                    <DateRangeLabels small>
                      Check in
                    </DateRangeLabels>
                    <DateRangeSplitter small />
                    <DateRangeLabels small>
                      <DateRangeRightLabel>
                        Check out
                      </DateRangeRightLabel>
                    </DateRangeLabels>
                  </DateRangeLabelsWrap>
                  <DateRangeStyle 
                    onChange={setDateRange}
                    value={dateRange}
                    className="picker"
                    calendarIcon={null}
                    rangeDivider={<DateRangeSplitter />}
                    clearIcon={null}
                    required={true}
                    format={'dd-MM-y'
                  }
                  />
                </DateRangeWrap>

                <GuestPickerWrap>
                  <GuestsInput
                    searchBar
                    type="text"
                    data-value={numberOfGuests}
                    onClick={() => { setGuestsPicker(!guestsPicker) }}
                  >
                    <GuestsInputInner>{numberOfGuests} guests</GuestsInputInner>
                  </GuestsInput>
                  <GuestPicker searchBar show={guestsPicker}>
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
                
                <HomeSubmit 
                  as={Link} 
                  to={{
                    pathname: '/search',
                    state: {
                      cityPart: searchInputValue,
                      dateRange: dateRange,
                      guests: numberOfGuests
                    }
                  }} >
                    Search
                </HomeSubmit>
              </HomeForm>
            </Div>
          </SearchBox>

          <PromotedLocations>
            {
              loading ? <IconLoading /> :
                error ? <div>Error {error} </div> :
                  listOfRooms.map(room => {
                    return room.promoted && (
                      <PromotedRoom
                        key={room.id}
                        info={room}
                      />
                    )
                  })
            }
          </PromotedLocations>
        </InnerContainer>

      </Container>
    </HomeCont>
  )
}

const HomeCont = styled.div`
  margin-top: 200px; 
  @media screen and (max-width: 1130px) {
    margin-top: 0;
  }
`;

const Header = styled.div`
  position: absolute;
  left: 0;
  top: 0%;
  z-index: -1;
  width: 100%;
  max-height: 700px;
  height: 100%;
  background: url("${props => props.src}") no-repeat 00/cover;
`;

const SearchBox = styled.div`
  background-color: ${props => props.theme.colors.brightMamba};
  border-radius: 5px;
  padding: 20px 40px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 500px) {
    box-shadow: none;
    padding: 20px;
  }
`;

const H1 = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 10px;
`;

const HomeForm = styled(Form)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 0;
  
  @media screen and (max-width: 1130px) {
    flex-direction: column;
    width: 100%;
  }
`;

const HomeInput = styled(Input)`
  height: 50px;
  width: 290px;

  ${props => props.small && 'width: 100px;'}

  @media screen and (max-width: 1130px) {
    width: 100%;
  }
`;

const HomeSubmit = styled(Submit)`
  width: 150px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (max-width: 1130px) {
    width: 100%;
  }
`;

const PromotedLocations = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 120px;
`;

const SearchWrap = styled.div`
  position: relative;
`;

const SearchResultWrap = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.brightMamba};
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;

  ${props => props.show ? 'display: block' : 'display: none'}
`;

const Result = styled.div`
  padding: 10px;
`;

