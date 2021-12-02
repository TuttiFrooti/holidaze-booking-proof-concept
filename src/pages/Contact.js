import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import MetaTags from 'react-meta-tags';

import { Container, InnerContainer, H1, SubH } from "../utils/theme";
import { Form, InputWrap, Input, TextArea, Label, FormError, FormSuccess, Submit } from '../components/Styles/FormStyle';
import { BASE_URL } from '../constants/api';
import { contactSchema } from '../constants/schemas';

export default function Contact() {
  const [sendMessageError, setSendMessageError] = useState(null);
  const [success, setSuccess ] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const url = `${BASE_URL}messages`;

  const onSubmit = async data => {
    console.log(data)
    try {
      const res = await axios.post(url, data);
      if (!!res.data) {
        setSuccess(true);
      } else {
        setSendMessageError('Something went wrong, please try again');
      }
    } catch (err) {
      setSendMessageError('Something went wrong, please try again.');
    }
  }

  return(
    <Container>
      <MetaTags>
        <title>Holidaze - Contact</title>
        <meta name="description" content="We at Holidaze care about you! Send us a message with your questions!" />
        <meta property="og:title" content="Holidaze Contact page. Your home away from home" />
      </MetaTags>
      <InnerContainer wide>
        <H1>Send us a message!</H1>
        <SubH>Required fields</SubH>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSuccess success={success}>Your message has successfully been sent!</FormSuccess>
          <FormError main>{sendMessageError}</FormError>
          <InputWrap>
            <Label required>What is your full name?</Label>
            <Input type="text" name="name" {...register('name', { required: true })} placeholder="Name..." />
            <FormError>{errors.name?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>What is your email address?</Label>
            <Input type="email" name="email" {...register('email', { required: true })} placeholder="Email address..." />
            <FormError>{errors.email?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>What is your phone number?</Label>
            <Input type="number" name="phoneNumber" {...register('phoneNumber', { required: true })} placeholder="Phone number..." />
            <FormError>{errors.phoneNumber?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>What is your message about?</Label>
            <Input type="text" name="title" {...register('title', { required: true })} placeholder="Message title..." />
            <FormError>{errors.title?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>What is your message about?</Label>
            <TextArea type="text" name="message" {...register('message', { required: true })} placeholder="Message..." />
            <FormError>{errors.message?.message}</FormError>
          </InputWrap>

          <Submit type="submit" m10>Send your message</Submit>
        </Form>
      </InnerContainer>
    </Container>
  )
}