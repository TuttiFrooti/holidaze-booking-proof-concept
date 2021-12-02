import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './utils/theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './utils/hooks/authContext';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import MadeReservations from './pages/admin pages/MadeReservations';
import AddEstablishment from './pages/admin pages/AddEstablishments';
import Messages from './pages/admin pages/Messages';
import Contact from './pages/Contact';
import SearchPage from './pages/Search';
import AccommodationPage from './pages/Accommodation';
import ReservationPage from './pages/Reservation';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Page>
            <NavBar />
            <Switch>
              <Route path='/' exact component={ Home } />
              <Route path='/login' exact component={ Login } />
              <Route path='/contact' exact component={ Contact } />
              <Route path='/admin' exact component={ Admin } />
              <Route path='/admin/reservations' exact component={ MadeReservations } />
              <Route path='/admin/messages' exact component={ Messages } />
              <Route path='/admin/add' exact component={ AddEstablishment } />
              <Route path='/booking' exact component={ ReservationPage } />
              <Route path='/search' exact component={ SearchPage } />
              <Route path='/accommodation/:id' exact component={ AccommodationPage } />
            </Switch>
            <Footer />
          </Page>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;