import { useContext } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from 'react-router';
import AuthContext from '../utils/hooks/authContext';

import logo from '../assets/logo.svg';
import { IconUser, IconLogout } from '../components/Icons';

export default function NavBar() {
  const [ auth, , removeAuth ] = useContext(AuthContext);
  const history = useHistory();

  const onLogoutClick = () => {
    removeAuth('jwt');
    history.push('/');
  }

  return(
    <Nav>
      <Div>
        <InnerDiv>
          <NavStyle to="/"><Logo src={logo} /></NavStyle>
          <NavStyle to="/contact">Contact</NavStyle>
        </InnerDiv>

        <DropdownContainer>
          <HoverIcon>
            <IconUser />
          </HoverIcon>
          <DropdownMenu>
            {!!auth ?
              <>
                <DropdownLink to="/admin">
                  <span>Admin page</span>
                </DropdownLink>
                <LogoutButton onClick={onLogoutClick}><IconLogout />Logout</LogoutButton>
              </>
              :
              <DropdownLink to="/login">
                <span>Login page</span>
              </DropdownLink>
            }
          </DropdownMenu>
        </DropdownContainer>
      </Div>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.brightMamba};

`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  max-width: 1060px;
  width: 100%;
  margin: 0 30px;
`;

const InnerDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

const NavStyle = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.deepDark};
  cursor: pointer;
  transition: color .2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const Logo = styled.img`
  width: 150px;
  cursor: pointer;
`;

const HoverIcon = styled.div`
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  font-size: 16px;
  right: 0;
  border-radius: 5px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.brightMamba};
`;

const DropdownContainer = styled.div`
  font-size: 1.8rem;
  position: relative;
  display: inline-block;
  color: ${props => props.theme.colors.primary};

  &:hover {
    ${DropdownMenu}{
      display: flex;
    }
  }
`;

const DropdownLink = styled(NavStyle)`
  width: 100%;
  border-radius: 5px;
  width: 120px;
  padding: 10px;
  transition: all .2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
    color: ${props => props.theme.colors.brightMamba};
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  border-radius: 5px;
  width: 120px;
  padding: 10px;
  color: ${props => props.theme.colors.deepDark};
  gap: 5px;

  transition: all .2s ease;
  &:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
    color: ${props => props.theme.colors.brightMamba};
  }
`;