
import styled from 'styled-components';

export const GuestsInput = styled.div`
  height: 40px;

  ${props => props.searchBar && `
    border: 1px solid ${props.theme.colors.lightGray};
    border-radius: 5px;
    height: 50px;
    display: flex;
    align-items: center;
    min-width: 150px;
  `}

  @media screen and (max-width: 500px) {
    ${props => props.responsive && `
      border: 1px solid ${props.theme.colors.lightGray};
      margin-top: 10px;
      border-radius: 5px;
      height: 50px;
      display: flex;
      align-items: center;
      min-width: 150px;
    `}
  }

`;
export const GuestsInputInner = styled.div`
  padding: 10px 22px;
`;

export const GuestPickerWrap = styled.div`
  position: relative;
`;

export const GuestPicker = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 45px;
  width: 100%;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: ${props => props.theme.colors.brightMamba};
  padding: 10px 0;

  ${props => props.searchBar && `
    min-width: 300px;
  `}
`;

export const GuestPickerContent = styled.div`
  display: flex;
  justify-content: ${props => props.close ? 'flex-end' : 'space-between'};
  align-items: center;
  padding: 10px 20px;
`;

export const GuestPickerClose = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

export const Picker = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const UpDownButtons = styled.div`
  cursor: pointer;
  border-radius: 100%;
  border: 1px solid ${props => props.theme.colors.deepDark};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;