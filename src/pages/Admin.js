import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AuthContext from '../utils/hooks/authContext';
import MetaTags from 'react-meta-tags';
import { Container, InnerContainer, H1 } from "../utils/theme";

export default function Admin() {
  const [auth, , ] = useContext(AuthContext);
  const history = useHistory();


  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth, history])

  return (
    <Container>
      <MetaTags>
        <title>Holidaze - Admin page</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze admin page. Your home away from home" />
      </MetaTags>
      <InnerContainer>
        <H1>Admin page</H1>
        <CardWrap>
          <Card to="/admin/add">
            <span>Add new<br />establishments</span>
          </Card>
          <Card to="/admin/reservations">
            <span>Reservations</span>
          </Card>
          <Card to="/admin/messages">
            <span>Customer<br />messages</span>
          </Card>
        </CardWrap>
      </InnerContainer>

    </Container>
  )
}

const CardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 30px;

  @media screen and (max-width: 840px) {
    flex-direction: column;
  }
`;

const Card = styled(Link)`
  height: 280px;
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  text-decoration: none;
  color: ${props => props.theme.colors.deepDark};
  text-align: center;
  padding: 20px;

  @media screen and (max-width: 840px) {
    width: 100%;
    height: 150px;
  }
`;