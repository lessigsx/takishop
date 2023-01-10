import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login({ colores, selActual, theme }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [data, setData] = useState({ email: '', password: '' });
  const rfcEmailValidation = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ); // Validación de email, RFC 2822
  const formIsComplete =
    rfcEmailValidation.test(data['email']) && data['password'].length > 0;
  const [authFailed, setAuthFail] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Navbar colores={colores} selActual={selActual} />
      <Box
        mr="20%"
        ml="20%"
        backgroundColor="whiteAlpha.600"
        boxShadow="2xl"
        p="6"
        mt="4"
        borderRadius="lg"
      >
        <Center>
          <Heading mb="2">Iniciar sesión</Heading>
        </Center>
        {authFailed ? (
          <Alert
            status="error"
            boxShadow="lg"
            rounded="lg"
            mt="4"
            mb="6"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            <AlertTitle>Autenticación fallida</AlertTitle>
            <AlertDescription>
              Revise que esté usando el email o contraseña correcto.
            </AlertDescription>
          </Alert>
        ) : null}
        <Box>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              placeholder="nombre@gmail.com"
              value={data['email']}
              onChange={(event) =>
                setData((oldData) => {
                  return { ...oldData, email: event.target.value };
                })
              }
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={data['password']}
              onChange={(event) =>
                setData((oldData) => {
                  return { ...oldData, password: event.target.value };
                })
              }
            />
          </FormControl>
          <Center mt="6">
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              isDisabled={!formIsComplete}
              onClick={() => {
                axios
                  .post('http://localhost:9000/login', {
                    email: data['email'],
                    password: data['password'],
                  })
                  .then((res) => {
                    if (res.data.authenticated) {
                      let date = new Date();
                      date.setFullYear(date.getFullYear() + 3);
                      cookies.set(
                        'user',
                        {
                          id: res.data.id,
                          name: res.data.name,
                          email: res.data.email,
                        },
                        {
                          path: '/',
                          sameSite: 'none',
                          secure: true,
                          expires: date,
                        }
                      );
                      navigate('/', { replace: true });
                    }
                  })
                  .catch((err) => {
                    setAuthFail(true);
                    setTimeout(() => {
                      setAuthFail(false);
                    }, 1500);
                  });
              }}
            >
              Iniciar sesión
            </Button>
          </Center>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
