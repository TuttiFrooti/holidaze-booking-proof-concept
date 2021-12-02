import * as yup from "yup";

export const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const contactSchema = yup.object().shape({
  name: yup.string().min(3, 'Please enter a name (min 3 characters)').required('Please enter your name'),
  email: yup.string().required('Please enter a valid email').matches(emailReg, 'Please enter a valid email'),
  phoneNumber: yup.string().min(8, 'Your phone number must be at least 8 numbers long').required('Please enter your phone number'),
  title: yup.string().required('Please enter what your message is about'),
  message: yup.string().min(10, 'Please enter a message (min 10 characters)').required(),
});

export const reserveSchema = yup.object().shape({
  firstName: yup.string().min(3, 'Please enter a first name (min 3 characters)').required('Please enter your first name'),
  lastName: yup.string().min(3, 'Please enter a last name (min 3 characters)').required('Please enter your last name'),
  email: yup.string().required('Please enter a valid email').matches(emailReg, 'Please enter a valid email'),
  phoneNumber: yup.string().min(8, 'Your phone number must be at least 8 numbers long').required('Please enter your phone number'),
  note: yup.string(),
});

export const addEstSchema = yup.object().shape({
  title: yup.string().required('Please enter the title of your establishment'),
  price: yup.string().required('Please enter the price per night'),
  rating: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of housing'),
  }).required('Please select the type of housing'),
  guests: yup.string().required('Please enter the max number of guests'),
  reserveFrom: yup.string().required('Please enter vacant from date'),
  reserveTo: yup.string().required('Please enter vacant to date'),
  address: yup.string().required('Please enter the address'),
  cityArea: yup.string().required('Please enter the city area'),
  distanceToCenter: yup.string().required('Please enter the distance to centrum'),
  promoted: yup.boolean(),
  quietArea: yup.boolean(),
  housingType: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of housing'),
  }).required('Please select the type of housing'),

  numberOfBedrooms: yup.string().required('Please enter the number of bedrooms'),
  bedroomType: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of bedroom'),
  }).required('Please select the type of bedroom'),

  bedType: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of bed'),
  }).required('Please select the type of bed'),

  numberOfBathrooms: yup.string().required('Please enter the number of bathrooms'),
  bathroomType: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of bathroom'),
  }).required('Please select the type of bathroom'),

  numberOfKitchens: yup.string().required('Please enter the number of kitchens'),
  kitchenType: yup.object({
    label: yup.string().required(),
    value: yup.string().required('Please select the type of kitchen'),
  }).required('Please select the type of kitchen'),

  description: yup.string().required('Please enter a discription of the location'),
  pictures: yup.string().required('Please add some pictures of the location'),
});