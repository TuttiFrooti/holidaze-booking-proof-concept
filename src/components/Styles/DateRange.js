import styled from "styled-components";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

export const DateRangeWrap = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    border: none;
  }
`;

export const DateRangeLabelsWrap = styled.div`
  margin-bottom: -4px;
  display: flex;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const DateRangeLabels = styled.div`
  width: 155px;
  font-size: 10px;
  font-weight: bold;
  height: 0;
  padding-left: 25px;
  padding-top: 10px;
  flex-grow: 1;
  `;

export const DateRangeRightLabel = styled.div`
  margin-left: -20px;
`;

export const DateRangeStyle = styled(DateRangePicker)`
    width: 100%;
    height: ${props => props.accomodationPage ? '40px' : '38px'};
    @media screen and (max-width: 500px) {
      height: auto;
    }

    @media screen and (min-width: 501px) {
      border-bottom: ${props => props.accomodationPage && `1px solid ${props.theme.colors.lightGray}`};
    }
    
  .react-daterange-picker__wrapper{
    border: none;
    padding: 0;
    padding: 0 20px;
    width: 100%;
    
    @media screen and (max-width: 500px) {
      flex-direction: column;

      .react-daterange-picker__inputGroup {
        border: 1px solid ${props => props.theme.colors.lightGray};
        border-radius: 5px;
        padding: 22px 20px 8px 20px;
        position: relative;
        width: 100%;

        &:before {
          content: 'Date from';
          display: block;
          position: absolute;
          top: 9px;
          font-size: 12px;
          font-weight: bold;
        }
      }
      .react-daterange-picker__inputGroup:last-child {
        margin-top: 10px;
        &:before {
          content: 'Date to';
        }
      }
    }
  }

  .react-daterange-picker__range-divider {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .react-daterange-picker__inputGroup__input {
    border: none;
    outline: none;
  }
`;

export const DateRangeSplitter = styled.div`
  height: ${props => props.small ? '15px' : '40px'};
  width: 1px;
  background-color: ${props => props.theme.colors.lightGray};
  margin: 0 20px;
`;
