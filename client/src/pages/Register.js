import React, { useState } from 'react';
import {
  Box,
  Heading,
  ChakraProvider,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Register({ colores, selActual, theme }) {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const passwordValidation = {
    hasEightChars: data['password'].length >= 8,
    hasNumber: /\d/.test(data['password']),
  };
  const [nombreLargo, toggleNameWarning] = useState(false);
  const [maxLength, toggleLengthWarning] = useState(false);
  const [register, setRegister] = useState({ show: false, success: false });
  const rfcEmailValidation = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ); // Validación de email, RFC 2822
  const formIsComplete =
    !nombreLargo &&
    !maxLength &&
    passwordValidation['hasEightChars'] &&
    passwordValidation['hasNumber'] &&
    rfcEmailValidation.test(data['email']) &&
    !register['show'];
  const navigate = useNavigate();

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Navbar colores={colores} selActual={selActual} />
        {register['show'] && register['success'] ? (
          <Box
            pos="fixed"
            zIndex={2}
            boxShadow="lg"
            rounded="lg"
            left="50%"
            top="50%"
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              h={[250, 200]}
              w={[280, 400]}
            >
              <AlertIcon boxSize="40px" mr="0" />
              <AlertTitle mt="4" mb="1" mr="0">
                Cuenta registrada con éxito!
              </AlertTitle>
              <AlertDescription maxWidth="sm" mt="2">
                Se te redirigirá al inicio de sesión en 3 segundos.
              </AlertDescription>
            </Alert>
          </Box>
        ) : null}

        {register['show'] && !register['success'] ? (
          <Box
            pos="fixed"
            zIndex={2}
            boxShadow="lg"
            rounded="lg"
            left="50%"
            top="50%"
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              h={[250, 200]}
              w={[280, 400]}
            >
              <AlertIcon boxSize="40px" mr="0" />
              <AlertTitle mt="4" mb="1" mr="0">
                Hubo un error de nuestra parte!
              </AlertTitle>
              <AlertDescription maxWidth="sm" mt="2">
                Intente utilizar el servicio más tarde.
              </AlertDescription>
            </Alert>
          </Box>
        ) : null}
        <Box
          mr="20%"
          ml="20%"
          backgroundColor="whiteAlpha.600"
          p="6"
          mt="4"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <Center>
            <Heading mb="2">Registrarse</Heading>
          </Center>
          <Box>
            <FormControl isRequired mb="4">
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                placeholder="José Velásquez"
                value={data['name']}
                onChange={(event) => {
                  if (event.target.value.length > 50) {
                    if (nombreLargo !== true) {
                      toggleNameWarning(true);
                      setTimeout(() => toggleNameWarning(false), 3000);
                    }
                  } else {
                    setData((oldData) => {
                      return { ...oldData, name: event.target.value };
                    });
                  }
                }}
              />
            </FormControl>
            {nombreLargo ? (
              <Box mt="4" mb="4">
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>Nombre muy largo</AlertTitle>
                  <AlertDescription>
                    No puede tener más de 50 carácteres.
                  </AlertDescription>
                </Alert>
              </Box>
            ) : null}
            {maxLength ? (
              <Box mt="4" mb="4">
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>Límite de carácteres</AlertTitle>
                  <AlertDescription>
                    Tu correo o contraseña no pueden tener más de 255
                    carácteres.
                  </AlertDescription>
                </Alert>
              </Box>
            ) : null}
            <FormControl isRequired mb="4">
              <FormLabel>Dirección de correo</FormLabel>
              <Input
                type="email"
                placeholder="nombre@gmail.com"
                value={data['email']}
                onChange={(event) => {
                  if (event.target.value.length < 255) {
                    setData((oldData) => {
                      return { ...oldData, email: event.target.value };
                    });
                  } else {
                    if (maxLength !== true) {
                      toggleLengthWarning(true);
                      setTimeout(() => toggleLengthWarning(false), 3000);
                    }
                  }
                }}
              />
              <FormHelperText>
                Sólo utilizaremos tu e-mail para pedidos y notificaciones
                urgentes.
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={data['password']}
                onChange={(event) => {
                  if (event.target.value.length < 255) {
                    setData((oldData) => {
                      return { ...oldData, password: event.target.value };
                    });
                  } else {
                    if (maxLength !== true) {
                      toggleLengthWarning(true);
                      setTimeout(() => toggleLengthWarning(false), 3000);
                    }
                  }
                }}
              />
              <FormHelperText>
                Debe tener al menos{' '}
                <Text
                  as="span"
                  textDecoration="underline"
                  textDecorationColor={
                    passwordValidation['hasEightChars']
                      ? 'green.600'
                      : 'red.600'
                  }
                  textDecorationThickness="1.25px"
                >
                  8 carácteres
                </Text>
                , y{' '}
                <Text
                  as="span"
                  textDecoration="underline"
                  textDecorationColor={
                    passwordValidation['hasNumber'] ? 'green.600' : 'red.600'
                  }
                  textDecorationThickness="1.25px"
                >
                  un número
                </Text>
                .
              </FormHelperText>
            </FormControl>
            <Center mt="6">
              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                isDisabled={!formIsComplete}
                onClick={() => {
                  axios
                    .post('http://localhost:9000/register', {
                      name: data['name'],
                      email: data['email'],
                      password: data['password'],
                    })
                    .then((res) => {
                      if (res['status'] === 200) {
                        setRegister({ show: true, success: true });
                        setTimeout(() => {
                          navigate('/login', { replace: true });
                        }, 3000);
                      }
                    })
                    .catch(() => {
                      setRegister({ show: true, success: false });
                      setTimeout(() => {
                        setRegister({ show: false, success: false });
                      }, 3000);
                    });
                }}
              >
                Registrarse
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Register;
