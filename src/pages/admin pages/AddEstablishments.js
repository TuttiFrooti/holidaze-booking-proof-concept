import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import Select from "react-select";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import moment from 'moment';
import { useForm, Controller } from "react-hook-form";
import MetaTags from 'react-meta-tags';

import AuthContext from '../../utils/hooks/authContext';
import { Container, InnerContainer, H1, SubH, } from "../../utils/theme";
import { Form, FormError, FormSuccess, InputWrap, Label, Input, Submit, SelectStylingObj, TextArea } from '../../components/Styles/FormStyle';
import { BASE_URL } from '../../constants/api';
import { BathroomAmeneties, KitchenAmeneties, GeneralAmeneties } from '../../constants/ameneties';
import CheckBox from '../../components/CheckBox';
import { addEstSchema } from '../../constants/schemas';

const url = `${BASE_URL}rooms`;

const housingTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
];

const bedTypes = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
]

const sharedTypes = [
  { value: 'shared', label: 'Shared' },
  { value: 'private', label: 'Private' },
];

const rating = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]


export default function AddEstablishment() {
  const [auth, ,] = useContext(AuthContext);
  const history = useHistory();
  const [success, setSuccess] = useState(null);
  const [addRoomError, setAddRoomError] = useState(null);

  const [promoted, setPromoted] = useState(false);
  const [quietArea, setQuietArea] = useState(false);

  const [bathroomAmeneties, setBathroomAmeneties] = useState([]);
  const [kitchenAmeneties, setKitchenAmeneties] = useState([]);
  const [generalAmeneties, setGeneralAmeneties] = useState([]);

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(addEstSchema)
  });

  const onSubmit = async data => {

    data.amenitiesBathroom = JSON.stringify(bathroomAmeneties)
    data.amenitiesKitchen = JSON.stringify(kitchenAmeneties)
    data.amenitiesGeneral = JSON.stringify(generalAmeneties)
    const bedroom = {
      bedrooms: data.numberOfBedrooms,
      shared: data.bedroomType.value === 'shared' ? true : false,
      bedType: data.bedType.value
    }
    const bathroom = {
      bathrooms: data.numberOfBathrooms,
      shared: data.bathroomType.value === 'shared' ? true : false,
    }
    const kitchen = {
      bathrooms: data.numberOfKitchens,
      shared: data.kitchenType.value === 'shared' ? true : false,
    }
    data.bedroom = JSON.stringify(bedroom)
    data.bathroom = JSON.stringify(bathroom)
    data.kitchen = JSON.stringify(kitchen)

    data.reserveFrom = new Date(data.reserveFrom);
    data.reserveTo = new Date(data.reserveTo);

    data.housingType = data.housingType.value;
    data.rating = data.rating.value;
    data.promoted = promoted;
    data.quietArea = quietArea;

    delete data.numberOfBedrooms;
    delete data.bedroomType;
    delete data.bedType;
    delete data.numberOfBathrooms;
    delete data.bathroomType;
    delete data.numberOfKitchens;
    delete data.kitchenType;

    data.pictures = JSON.stringify(data.pictures.split(' '))

    async function getAllMessages() {
      try {
        const res = await axios.post(url, data, {
          headers: {
            'Authorization': `Bearer ${auth.jwt}`
          }
        });
        if (!!res.data) {
          setSuccess(true);
        } else {
          setAddRoomError('Something went wrong, please try again');
        }
      } catch (err) {
        setAddRoomError('Something went wrong, please try again.');
      }
    }
    getAllMessages();
  }

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth, history]);

  const handleChange = e => {
    let name = e.target.name;
    // eslint-disable-next-line default-case
    switch (e.target.dataset.class) {
      case 'bathroom':
        if (bathroomAmeneties.includes(name)) {
          setBathroomAmeneties(bathroomAmeneties.filter(a => name !== a));
        }
        else {
          setBathroomAmeneties([...bathroomAmeneties, name]);
        }
        break;
      case 'kitchen':
        if (kitchenAmeneties.includes(name)) {
          setKitchenAmeneties(kitchenAmeneties.filter(a => name !== a));
        }
        else {
          setKitchenAmeneties([...kitchenAmeneties, name]);
        }
        break;
      case 'general':
        if (generalAmeneties.includes(name)) {
          setGeneralAmeneties(generalAmeneties.filter(a => name !== a));
        }
        else {
          setGeneralAmeneties([...generalAmeneties, name]);
        }
        break;
      case 'promoted':
        setPromoted(!promoted);
        break;
      case 'quiet':
        setQuietArea(!quietArea);
        break;
    }
  }

  // console.log(bathroomAmeneties)
  return (
    <Container>
      <MetaTags>
        <title>Holidaze - Add new establishment</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze. Your home away from home" />
      </MetaTags>
      <InnerContainer wide>
        <H1>Add a new establishment</H1>
        <SubH>Required fields</SubH>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSuccess success={success}>Establishment successfully added!</FormSuccess>
          <FormError main>{addRoomError}</FormError>

          <InputWrap>
            <Label required>Title</Label>
            <Input type="text" name="title" {...register('title', { required: true })} placeholder="Title..." />
            <FormError>{errors?.title?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>Price per night</Label>
            <CenterAlign>
              <Input type="text" {...register('price', { required: true })} placeholder="Price per night..." />
              <span>NOK</span>
            </CenterAlign>
            <FormError>{errors?.price?.message}</FormError>
          </InputWrap>
          <InputWrap>

            <Label required>Rating (1-5)</Label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) =>
                <SelectStyle
                  {...field}
                  styles={SelectStylingObj}
                  options={rating}
                />
              }
            />
            <FormError>{errors?.rating?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>Max number of guests</Label>
            <Input type="text" {...register('guests', { required: true })} placeholder="Guests..." />
            <FormError>{errors?.guests?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>Available from</Label>
            <Input dateInput type="date" {...register('reserveFrom', { required: true })}
              placeholder={moment().format("DD/MM/YYYY")} />
            <FormError>{errors?.reserveFrom?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>Available to</Label>
            <Input dateInput type="date" {...register('reserveTo')}
              placeholder={moment().format("DD/MM/YYYY")} />
            <FormError>{errors?.reserveTo?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>Address</Label>
            <Input type="text" {...register('address', { required: true })} placeholder="Address..." />
            <FormError>{errors?.address?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>City area</Label>
            <Input type="text" {...register('cityArea', { required: true })} placeholder="City area..." />
            <FormError>{errors?.cityArea?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>Distance to city center</Label>
            <Input type="text" {...register('distanceToCenter', { required: true })} placeholder="Distance to city center..." />
            <FormError>{errors?.distanceToCenter?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label>Is this location promoted?</Label>
            <CheckBox
              label={'Promoted'}
              name={'promoted'}
              dataClass={'promoted'}
              onChange={handleChange}
            />
          </InputWrap>
          <InputWrap>
            <Label>Is this location quiet?</Label>
            <CheckBox
              label={'Quiet area'}
              name={'quietArea'}
              dataClass={'quiet'}
              onChange={handleChange}
            />
          </InputWrap>
          <InputWrap>
            <Label required>What is being rented out?</Label>
            <Controller
              name="housingType"
              control={control}
              render={({ field }) =>
                <SelectStyle
                  {...field}
                  styles={SelectStylingObj}
                  options={housingTypes}
                />
              }
            />
            <FormError>{errors?.maxGuests?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>How many bedrooms are there? And are they shared?</Label>
            <Wrap>
              <Input type="number" {...register('numberOfBedrooms', { required: true })} placeholder="Number of bathrooms..." />
              <Controller
                name="bedroomType"
                control={control}
                render={({ field }) =>
                  <SelectStyle
                    {...field}
                    styles={SelectStylingObj}
                    options={sharedTypes}
                  />
                }
              />
            </Wrap>
            <FormError>{errors?.numberOfBedrooms?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>What type of bed is there?</Label>
            <Controller
              name="bedType"
              control={control}
              render={({ field }) =>
                <SelectStyle
                  {...field}
                  styles={SelectStylingObj}
                  options={bedTypes}
                />
              }
            />
            <FormError>{errors?.bedType?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>How many bathrooms are there? And are they shared?</Label>
            <Wrap>
              <Input type="number" {...register('numberOfBathrooms', { required: true })} placeholder="Number of bathrooms..." />
              <Controller
                name="bathroomType"
                control={control}
                render={({ field }) =>
                  <SelectStyle
                    {...field}
                    styles={SelectStylingObj}
                    options={sharedTypes}
                  />
                }
              />
            </Wrap>
            <FormError>{errors?.numberOfBathrooms?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label required>How many kitchens are there? And are they shared?</Label>
            <Wrap>
              <Input type="number" {...register('numberOfKitchens', { required: true })} placeholder="Number of kitchens..." />
              <Controller
                name="kitchenType"
                control={control}
                render={({ field }) =>
                  <SelectStyle
                    {...field}
                    styles={SelectStylingObj}
                    options={sharedTypes}
                  />
                }
              />
            </Wrap>
            <FormError>{errors?.numberOfKitchens?.message}</FormError>
          </InputWrap>

          <InputWrap>
            <Label>Ameneties</Label>

            <SubLabel>Bathroom</SubLabel>

            <CheckBoxContainer>
              {
                BathroomAmeneties.map(item => (
                  <CheckBox key={item.name}
                    label={item.label}
                    name={item.name}
                    dataClass={item.class}
                    onChange={handleChange}
                  />
                ))
              }
            </CheckBoxContainer>
            <SubLabel>Kitchen</SubLabel>

            <CheckBoxContainer>
              {
                KitchenAmeneties.map(item => (
                  <CheckBox key={item.name}
                    label={item.label}
                    name={item.name}
                    dataClass={item.class}
                    onChange={handleChange}
                  />
                ))
              }
            </CheckBoxContainer>
            <SubLabel>General</SubLabel>
            <CheckBoxContainer>
              {
                GeneralAmeneties.map(item => (
                  <CheckBox key={item.name}
                    label={item.label}
                    name={item.name}
                    dataClass={item.class}
                    onChange={handleChange}
                  />
                ))
              }
            </CheckBoxContainer>
          </InputWrap>

          <InputWrap>
            <Label required>Description</Label>
            <TextArea type="text" name="description" {...register('description', { required: true })} placeholder="Description..." />
            <FormError>{errors.description?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>Image links (space separated)</Label>
            <TextArea type="text" name="pictures" {...register('pictures', { required: true })} />
            <FormError>{errors.pictures?.message}</FormError>
          </InputWrap>

          <Submit type="submit" m10>Add product</Submit>
        </Form>
      </InnerContainer>
    </Container>
  )
}

const SelectStyle = styled(Select)`
  min-width: 170px;
`;

const SubLabel = styled.label`
  font-weight: bold;
  margin: 15px 0;
`;

const CheckBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 190px);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 15px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 20px;

  ${Input} {
    flex: 1;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;

    ${Input} {
      flex: auto;
    }
  }
`;

const CenterAlign = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
