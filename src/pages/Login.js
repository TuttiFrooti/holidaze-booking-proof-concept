import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, H1, SubH } from "../utils/theme";
import { Form, InputWrap, Input, Label, FormError, Submit } from '../components/Styles/FormStyle';
import AuthContext from '../utils/hooks/authContext';
import { BASE_URL } from '../constants/api';
import { loginSchema } from '../constants/schemas';
import MetaTags from 'react-meta-tags';

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const url = `${BASE_URL}auth/local`;

  const onSubmit = async data => {
    try {
      const res = await axios.post(url, data);
      if (!!res.data) {
        setAuth(res.data);
        history.push('/admin');
      } else {
        setLoginError('Something went wrong, try again');
      }
    } catch (err) {
      setLoginError('Login failed. Make sure your username and password are correct.');
    }
  }

  useEffect(() => {
    if (!!auth) {
      history.push('/admin');
    }
  }, [auth, history])

  return (
    <LoginContainer>
      <MetaTags>
        <title>Holidaze - Admin login</title>
        <meta name="description" content="Holidaze, your destination to find your next destination in Bergen! Let the story begin here. Your home, away from home" />
        <meta property="og:title" content="Holidaze login page. Your home away from home" />
      </MetaTags>
      <Div>
        <H1>Admin login</H1>
        <SubH>Required fields</SubH>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormError main>{loginError}</FormError>
          <InputWrap>
            <Label required>Username</Label>
            <Input type="text" name="identifier" {...register('identifier', { required: true })} placeholder="Username..." />
            <FormError>{errors?.identifier?.message}</FormError>
          </InputWrap>
          <InputWrap>
            <Label required>Password</Label>
            <Input type="password" {...register('password', { required: true })} placeholder="Password..." />
            <FormError>{errors?.password?.message}</FormError>
          </InputWrap>

          <Submit type="submit" m10>Login</Submit>
        </Form>
      </Div>
    </LoginContainer>
  )
}

const LoginContainer = styled(Container)`
  margin-top: 100px;
  align-items: center;
`;

const Div = styled.div`
  max-width: 300px;
  width: 100%;
`;