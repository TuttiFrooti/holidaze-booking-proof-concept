import styled from "styled-components";
import { Link } from 'react-router-dom';
import { truncate } from "../utils/truncate";

export default function PromotedRoom({info}) {

  const pictures = JSON.parse(info.pictures);
  const title = truncate(info.title, 40);

  return(
    <PromotedLocation to={`/accommodation/${info.id}`}>
      <Picture src={pictures[0]}/>
      <Title>
        {title}
      </Title>
    </PromotedLocation>
  )
}

const PromotedLocation = styled(Link)`
  width: 250px;
  max-height: 250px;
  text-decoration: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: ${props => props.theme.colors.brightMamba};
`;

const Picture = styled.div`
  background: url(${props => props.src}) no-repeat 00/cover ;
  width: 250px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Title = styled.div`
  margin: 10px 7px;
  color: ${props => props.theme.colors.deepDark};
  font-weight: bold;
  font-size: 14px;
`;