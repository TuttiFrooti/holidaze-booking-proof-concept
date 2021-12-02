import styled, { createGlobalStyle } from 'styled-components';
import fontelloEOT from '../assets/font/fontello.eot?90076464';
import fontelloEOTIEfix from '../assets/font/fontello.eot?90076464#iefix';
import fontelloWOFF2 from '../assets/font/fontello.woff2?90076464';
import fontelloWOFF from '../assets/font/fontello.woff?90076464';
import fontelloTTF from '../assets/font/fontello.ttf?90076464';
import fontelloSVG from '../assets/font/fontello.svg?90076464#fontello';

export const theme = {
  colors: {
    deepDark: '#262A29',
    brightMamba: '#F5FAFF',
    brightMambaHover: '#F8FCFF',
    white: '#ffffff',
    black: '#141414',
    primary: '#45307B',
    primaryHover: '#614D94',
    primaryFocus: '#2E1A62',
    secondary: '#2B4886',
    secondaryHover: '#435E96',
    secondaryFocus: '#19346D',
    lightGray: '#908f8f',
    warning: '#FFC107',
    alert: '#DC3545',
    success: '#28A745',
  },
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'fontello';
    src: url(${fontelloEOT});
    src: url(${fontelloEOTIEfix}) format('embedded-opentype'),
        url(${fontelloWOFF2}) format('woff2'),
        url(${fontelloWOFF}) format('woff'),
        url(${fontelloTTF}) format('truetype'),
        url(${fontelloSVG}) format('svg');
    font-weight: normal;
    font-style: normal;
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.colors.brightMamba};
    color: ${props => props.theme.colors.black};
    position: relative;
    height: 100%;
  };

  * {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    box-sizing: border-box;
  };
`;

export const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  width: 100%;
  margin: 100px auto 50px auto;
  margin-top: ${props => props.smallTop && '30px;'};

  @media screen and (max-width: 1100px) {
    max-width: 100%;
    align-items: space-around;
    margin-top: 50px;
    margin-bottom: 20px;
  }
`;

export const InnerContainer = styled.div`
  padding: 0 30px;

  ${props => props.wide && `
    max-width: 700px;
  `}

  @media screen and (max-width: 500px) {
    padding: 0 15px;
  }
`;

export const H1 = styled.h1`
  font-size: 36px;
  font-weight: normal;
`;

export const SubH = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.lightGray};
  position: relative;
  left: 10px;

  &:before {
    content: '*';
    color: ${props => props.theme.colors.alert};
    display: inline-block;
    position: absolute;
    left: -10px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;