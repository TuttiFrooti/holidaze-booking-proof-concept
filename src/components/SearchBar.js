import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAxios from '../utils/hooks/useAxios';
import { useMediaQuery } from 'react-responsive';

import { Form, Input, Submit } from './Styles/FormStyle';
import useDebounce from '../utils/hooks/useDebounce';

import { DateRangeWrap, DateRangeLabelsWrap, DateRangeLabels, DateRangeRightLabel, DateRangeStyle, DateRangeSplitter } from '../components/Styles/DateRange';
import { GuestsInput, GuestsInputInner, GuestPickerWrap, GuestPicker, GuestPickerContent, GuestPickerClose, Picker, UpDownButtons } from './Styles/GuestPickerStyle';
// import { GuestsInput, GuestsInputInner, GuestPickerWrap, GuestPicker, GuestPickerContent, GuestPickerClose, Picker, UpDownButtons } from '../components/Styles/GuestPicker';

export default function SearchBar({ incomingListOfRooms, guests, onClick }) {
  const [listOfRooms, setListOfRooms] = useState(null);
  const [typeaheadInput, setTypeaheadInput] = useDebounce('');
  const [searchResult, setSearchResult] = useState(null);
  const [showResponsiveSearch, setShowResponsiveSearch] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(parseInt(guests) || 2);
  const [guestsPicker, setGuestsPicker] = useState(null);
  const call = useAxios();

  const isNotDesktop = useMediaQuery({
    query: 'screen and (max-width: 1110px)'
  });

  useEffect(() => {
    async function getAllMessages() {
      if (!incomingListOfRooms) {
        try {
          const res = await call.get(`rooms`);
          setListOfRooms(res.data);
        }
        catch (err) {
          console.log(err.toString());
        }
      }
      else {
        setListOfRooms(incomingListOfRooms);
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

  const searchButtonOnClick = () => {
    setSearchResult(null);

    if (onClick) {
      onClick(searchInputValue, dateRange, numberOfGuests.toString());
    }
  }

  return (
    <>
      {
        isNotDesktop ?
          <ResponsiveSearchBarWrap>
            <ResponsiveSearchWrap>
              <ResponsivePlaceholderInput 
                onClick={() => { setShowResponsiveSearch(!showResponsiveSearch)}} 
                type="text" 
                defaultValue="Where do you want to go?"
              />

              <ResponsiveSearchContainer show={showResponsiveSearch}>

                <ResponsiveCloseWrap
                  onClick={() => { setShowResponsiveSearch(!showResponsiveSearch) }}
                >
                  <ResponsiveCloseButton>
                    X
                  </ResponsiveCloseButton>
                </ResponsiveCloseWrap>
                <H1>Search</H1>
                <ResponsiveSearchBarContent>
                  <SearchWrap>
                    <SearchInput onChange={typeaheadOnChange} type="text" placeholder="What part of the city do you want to visit?" value={searchInputValue} />
                    <TypeaheadSearchResultWrap show={searchResult}>
                      {!!searchResult && searchResult.map(result => {
                        return (
                          <Result
                            key={result.id}
                            onClick={typeaheadOnClick}
                            data-content={result.cityArea}
                          >
                            {result.cityArea}
                          </Result>
                        )
                      })
                      }
                    </TypeaheadSearchResultWrap>
                  </SearchWrap>

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
                    <DateRangeStyle
                      onChange={setDateRange}
                      value={dateRange}
                      className="picker"
                      calendarIcon={null}
                      rangeDivider={<DateRangeSplitter />}
                      clearIcon={null}
                      required={true}
                      format={'dd-MM-y'}
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

                  <SearchButton
                    responsive={'true'}
                    onClick={searchButtonOnClick}
                    as={Link}
                    to={{
                      pathname: '/search',
                      state: {
                        cityPart: searchInputValue,
                        dateRange: dateRange,
                        guests: numberOfGuests.toString()
                      }
                    }}
                  >
                    Search
                  </SearchButton>
                </ResponsiveSearchBarContent>
      
              </ResponsiveSearchContainer>
            </ResponsiveSearchWrap>
          </ResponsiveSearchBarWrap>
          :

          <SearchBarWrap>
            <SearchWrap>
              <SearchInput onChange={typeaheadOnChange} type="text" placeholder="What part of the city do you want to visit?" value={searchInputValue} />
              <TypeaheadSearchResultWrap show={searchResult}>
                {!!searchResult && searchResult.map(result => {
                  return (
                    <Result
                      key={result.id}
                      onClick={typeaheadOnClick}
                      data-content={result.cityArea}
                    >
                      {result.cityArea}
                    </Result>
                  )
                })
                }
              </TypeaheadSearchResultWrap>
            </SearchWrap>

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
              <DateRangeStyle
                onChange={setDateRange}
                value={dateRange}
                className="picker"
                calendarIcon={null}
                rangeDivider={<DateRangeSplitter />}
                clearIcon={null}
                required={true}
                format={'dd-MM-y'}
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

            <SearchButton
              thin={'true'}
              onClick={searchButtonOnClick}
              as={Link}
              to={{
                pathname: '/search',
                state: {
                  cityPart: searchInputValue,
                  dateRange: dateRange,
                  guests: numberOfGuests.toString()
                }
              }}
            >
              Search
            </SearchButton>
          </SearchBarWrap>
      }

    </>
  )
}
const ResponsiveSearchBarWrap = styled(Form)`
  flex-direction: row;
  margin-bottom: 30px;
`

const ResponsiveSearchWrap = styled.div`
  flex-grow: 1;
`;

const ResponsivePlaceholderInput = styled(Input)`
  height: 50px;
  width: 100%;
`;

const ResponsiveSearchContainer = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${props => props.theme.colors.brightMamba};
  height: 100vh;
  width: 100%;
  z-index: 10;
`;

const ResponsiveCloseWrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const ResponsiveCloseButton = styled.div`
  border: 1px solid ${props => props.theme.colors.alert};
  color: ${props => props.theme.colors.alert};
  border-radius: 100%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResponsiveSearchBarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
`;


const SearchBarWrap = styled(Form)`
  flex-direction: row;
  margin-bottom: 50px;
`;

const SearchInput = styled(Input)`
  height: 50px;
  width: ${props => props.small ? '150px' : '350px'};
  

  @media screen and (max-width: 1110px) {
    width: 100%;
  }
`;

const SearchButton = styled(Submit)`
  width: ${props => props.responsive ? '100%' : '150px'};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  ${props => props.thin && `
    background-color: ${props.theme.colors.brightMamba};
    border: 1px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};

    transition: color .2s ease;
    &:hover {
      color: ${props.theme.colors.brightMamba};
    }
    &:active {
      color: ${props.theme.colors.brightMamba};
    }
  `}
`;

const SearchWrap = styled.div`
  position: relative;
`;

const TypeaheadSearchResultWrap = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.brightMamba};
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);

  ${props => props.show ? 'display: block' : 'display: none'}
`;

const Result = styled.div`
  padding: 10px;
`;


