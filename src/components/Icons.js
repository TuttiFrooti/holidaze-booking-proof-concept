import styled from "styled-components";

const Icon = styled.i`
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const IconStar = () => { return <IconContainer><Icon>&#xe800;</Icon></IconContainer> }
export const IconUser = () => { return <IconContainer><Icon>&#xe801;</Icon></IconContainer> }
export const IconArrowRightBig = () => { return <IconContainer><Icon>&#xe802;</Icon></IconContainer> }
export const IconArrowRight = () => { return <IconContainer><Icon>&#xe803;</Icon></IconContainer> }
export const IconArrowLeft = () => { return <IconContainer><Icon>&#xe804;</Icon></IconContainer> }
export const IconLocation = () => { return <IconContainer><Icon>&#xe805;</Icon></IconContainer> }
export const IconMoon = () => { return <IconContainer><Icon>&#xe806;</Icon></IconContainer> }
export const IconHome = () => { return <IconContainer><Icon>&#xe807;</Icon></IconContainer> }
export const IconUsers = () => { return <IconContainer><Icon>&#xe808;</Icon></IconContainer> }
export const IconCamera = () => { return <IconContainer><Icon>&#xe809;</Icon></IconContainer> }
export const IconLoading = () => { return <IconContainer><Icon>&#xe838;</Icon></IconContainer> }
export const IconKitchen = () => { return <IconContainer><Icon>&#xf0f5;</Icon></IconContainer> }
export const IconWifi = () => { return <IconContainer><Icon>&#xf1eb;</Icon></IconContainer> }
export const IconBath = () => { return <IconContainer><Icon>&#xf2cd;</Icon></IconContainer> }
export const IconLogout = () => { return <IconContainer><Icon>&#xe80a;</Icon></IconContainer> }
export const IconUp = () => { return <IconContainer><Icon>&#xe80b;</Icon></IconContainer> }
export const IconDown = () => { return <IconContainer><Icon>&#xe80c;</Icon></IconContainer> }