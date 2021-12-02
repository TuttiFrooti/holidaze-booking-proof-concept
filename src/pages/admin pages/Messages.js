import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import MetaTags from 'react-meta-tags';

import AuthContext from '../../utils/hooks/authContext';
import useAxios from '../../utils/hooks/useAxios';
import { Container, InnerContainer, H1 } from "../../utils/theme";
import { IconLoading } from '../../components/Icons';
import MessageAccordion from '../../components/MessageAccordion';

export default function Messages() {
  const [auth, ,] = useContext(AuthContext);
  const history = useHistory();
  const [ allMessages, setAllMessages ] = useState([]);
  const [ accordionClick, setAccordionClick ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const call = useAxios();

  useEffect(() => {
    async function getAllMessages() {
      try {
        const res = await call.get(`messages`);
        setAllMessages(res.data);
      }
      catch(err) {
        setError(err.toString());
      }
      finally {
        setLoading(false);
      }
    }
    getAllMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth, history]);

  const AccordionClick = e => {
    console.dir(e.target)
    setAccordionClick({
      ...accordionClick,
      [e.target.dataset.id]: !accordionClick[e.target.dataset.id]
    });
  }
  
  return(
    <Container>
      <MetaTags>
        <title>Holidaze - Messages</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze. Your home away from home" />
      </MetaTags>
      <InnerContainer>
        <H1>Admin message board</H1>
        <div>
          <MessagesCont>
            {
              loading ? <IconLoading /> :
                error ? <div>Error {error} </div> :
                  allMessages.map( message => {
                    return(
                      <MessageAccordion
                        message={message} 
                        key={message.id} 
                        onClick={AccordionClick}
                        open={accordionClick[message.id]}
                      />
                    )
                  })
            }
          </MessagesCont>
        </div>
      </InnerContainer>
    </Container>
  )
}

const MessagesCont = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;